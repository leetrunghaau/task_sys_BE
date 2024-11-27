const { resOk } = require("../helpers/utils");
const createError = require('http-errors');
const MemberService = require("../services/project.member");
const UserService = require("../services/user");
const MemberRoleService = require("../services/project.member-role");

const get = async (req, res, next) => {
    try {
        const data = await MemberService.read(req.params.id)
        if (!data) {
            return next(createError.BadRequest())
        }
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const getsByProject = async (req, res, next) => {
    try {
        const data = await MemberService.readsByProject(req.params.pId);
        if (!data) {
            return next(createError.BadRequest('No members found for the given project.'));
        }

        const memberIds = data.map(item => item.id);
        const memberRole = await MemberRoleService.readsByMember(memberIds);
        const rolesMap = new Map();
        memberRole.forEach(roleItem => {
            if (!rolesMap.has(roleItem.memberId)) {
                rolesMap.set(roleItem.memberId, []);
            }
            const item = {
                id: roleItem.ProjectRole.id,
                name: roleItem.ProjectRole.name
            }
            rolesMap.get(roleItem.memberId).push(item);
        });
        const rs = data.map((member) => {
            const item = {
                id: member.id,
                User: member.User,
                Roles: rolesMap.get(member.id) || []
            }
            return item
        });
        return resOk(res, rs)

    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const create = async (req, res, next) => {
    try {
        //check user in project
        const user = await UserService.read(req.body.userId)
        if (!user) {
            return next(createError.BadRequest("not user"))
        }
        const member = await MemberService.readByProjectUser(req.params.pId, req.body.userId)
        if (member) {
            return next(createError.BadRequest('user in project'))
        }
        const data = await MemberService.create({
            projectId: req.params.pId,
            userId: req.body.userId
        })
        if (!data) {
            return next(createError.BadRequest())
        }
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};


const del = async (req, res, next) => {
    try {
        const data = await MemberService.delete(req.params.id)
        if (data <= 0) {
            return next(createError.BadRequest())
        }
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};

module.exports = {
    get,
    getsByProject,
    create,
    del
}
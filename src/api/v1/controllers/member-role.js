const { resOk } = require("../helpers/utils");
const createError = require('http-errors');
const MemberService = require("../services/project.member");
const UserService = require("../services/user");
const MemberRoleService = require("../services/project.member-role");
const ProjectRoleService = require("../services/project.role");

const create = async (req, res, next) => {
    try {
        //check role
        const role = await ProjectRoleService.readByIdProject(req.body.roleId, req.params.pId);
        if (!role) { return next(createError.BadRequest("Role này không có trong dự án")) }
        //check member role
        const memberRole = await MemberRoleService.readByMemberRole(req.params.mId, req.body.roleId);
        if (memberRole) { resOk(res, memberRole); return; }
        //create
        const data = await MemberRoleService.create({ memberId: req.params.mId, roleId: req.body.roleId })
        if (!data) { return next(createError.BadRequest()) }
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const del = async (req, res, next) => {
    try {
        //check role
        const memberRole = await MemberRoleService.readByMemberRole(req.params.mId, req.params.id);
        if (!memberRole) { resOk(res, true); return; }
        //create
        const data = await MemberRoleService.delete(memberRole.id)
        if (!data) { return next(createError.BadRequest()) }
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
module.exports = {
    create,
    del
}
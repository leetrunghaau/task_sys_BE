const { resOk } = require("../helpers/utils");
const PriorityService = require("../services/issues.priority");
const createError = require('http-errors');
const MemberService = require("../services/project.member");
const UserService = require("../services/user");

const get = async (req, res, next) => {
    try {
        const data = await PriorityService.read(req.params.id);
        if (!data) {
            return next(createError.BadRequest())
        }
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
}
const getsByProject = async (req, res, next) => {
    try {
        const data = await PriorityService.readsByProjectId(req.params.id)
        if (!data) {
            return next(createError.BadRequest())
        }
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const create = async (req, res, next) => {
    try {
        //check user in project
        const user = await UserService.read(req.body.userId)
        if (!user){
            return next(createError.BadRequest("not user"))
        }
        const member = await MemberService.readByProjectMember(req.params.pId, req.body.userId)
        if (member){
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
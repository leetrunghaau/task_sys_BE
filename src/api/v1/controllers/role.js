const { resOk } = require("../helpers/utils");
const RoleService = require("../services/project.role");
const createError = require('http-errors');

const getsByProject = async (req, res, next) => {
    try {
        const data = await RoleService.readsByProject(req.params.pId)
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
        req.body.projectId = req.params.pId
        const data = await RoleService.create(req.body)
        if (!data) {
            return next(createError.BadRequest())
        }
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const update = async (req, res, next) => {
    try {
        const data = await RoleService.update(req.params.id, req.body );
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
        const data = await RoleService.delete(req.params.id)
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
    getsByProject,
    create, 
    update,
    del
}
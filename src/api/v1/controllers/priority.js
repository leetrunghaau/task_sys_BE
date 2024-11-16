const { resOk } = require("../helpers/utils");
const PriorityService = require("../services/issues.priority");
const createError = require('http-errors');

const getsByProject = async (req, res, next) => {
    try {
        const data = await PriorityService.readsByProject(req.params.pId)
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
        const data = await PriorityService.create(req.body)
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
        const data = await PriorityService.update(req.params.id, {name: req.body.name ?? ""});
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
        const data = await PriorityService.delete(req.params.id)
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
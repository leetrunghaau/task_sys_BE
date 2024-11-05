const { resOk } = require("../helpers/utils");
const PriorityService = require("../services/issues.priority");
const createError = require('http-errors');

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
        let { id, ...data } = req.body;
        data = await PriorityService.update(id, data);
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
    get,
    getsByProject,
    create, 
    update,
    del
}
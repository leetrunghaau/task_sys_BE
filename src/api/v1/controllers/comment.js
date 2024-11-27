const { resOk } = require("../helpers/utils");
const CommentService = require("../services/issues.comment");
const createError = require('http-errors');

const gets = async (req, res, next) => {
    try {
        const data = await CommentService.reads()
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
        req.body.issuesId = req.params.iId
        req.body.userId = req.user.id
        req.body.created = new Date()
        const data = await CommentService.create(req.body)
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
        const data = await CommentService.update(req.params.id, req.body);
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
        const data = await CommentService.delete(req.params.id)
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
    gets,
    create,
    update,
    del
}
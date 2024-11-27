const { resOk } = require("../helpers/utils");
const NoteService = require("../services/issues.note");
const createError = require('http-errors');

const create = async (req, res, next) => {
    try {
        req.body.issuesId = req.params.iId
        const data = await NoteService.create(req.body)
        if (!data) {
            return next(createError.BadRequest())
        }
        const rs =await NoteService.readsByIssue(req.params.iId)
        resOk(res, rs)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const creates = async (req, res, next) => {
    try {
        let input = req.body.map(item => {
            return {
                ...item,
                issuesId: req.params.iId
            };
        });
        const data = await NoteService.creates(input)
        if (!data) {
            return next(createError.BadRequest())
        }
        const rs =await NoteService.readsByIssue(req.params.iId)
        resOk(res, rs)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const update = async (req, res, next) => {
    try {
        const data = await NoteService.update(req.params.id, req.body);
        if (!data) {
            return next(createError.BadRequest())
        }
        const rs =await NoteService.readsByIssue(req.params.iId)
        resOk(res, rs)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const del = async (req, res, next) => {
    try {
        const data = await NoteService.delete(req.params.id)
        if (data <= 0) {
            return next(createError.BadRequest())
        }
        const rs =await NoteService.readsByIssue(req.params.iId)
        resOk(res, rs)
        
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
module.exports = {
    create,
    creates,
    update,
    del
}
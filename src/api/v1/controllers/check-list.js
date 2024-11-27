const { resOk } = require("../helpers/utils");
const IssuesService = require("../services/issues");
const CheckListService = require("../services/issues.check-list");
const createError = require('http-errors');

const create = async (req, res, next) => {
    try {
        req.body.issuesId = req.params.iId
        const data = await CheckListService.create(req.body)
        if (!data) {

            return next(createError.BadRequest())
        }
        const checkList = await CheckListService.readsByIssue(req.params.iId)
        let progress = Math.floor((checkList.filter(item => item.checked).length / checkList.length) * 100);
        const temp = await IssuesService.update(req.params.iId, { progress: progress })
        resOk(res, data)
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
        const data = await CheckListService.creates(input)
        if (!data) {
            return next(createError.BadRequest())
        }
        const checkList = await CheckListService.readsByIssue(req.params.iId)
        let progress = Math.floor((checkList.filter(item => item.checked).length / checkList.length) * 100);
        const temp = await IssuesService.update(req.params.iId, { progress: progress })
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const update = async (req, res, next) => {
    try {
        const data = await CheckListService.update(req.params.id, req.body);
        if (!data) {
            return next(createError.BadRequest())
        }
        const checkList = await CheckListService.readsByIssue(req.params.iId)
        let progress = Math.floor((checkList.filter(item => item.checked).length / checkList.length) * 100);
        const temp = await IssuesService.update(req.params.iId, { progress: progress })
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const del = async (req, res, next) => {
    try {
        const data = await CheckListService.delete(req.params.id)
        if (data <= 0) {
            return next(createError.BadRequest())
        }
        const checkList = await CheckListService.readsByIssue(req.params.iId)
        let progress = Math.floor((checkList.filter(item => item.checked).length / checkList.length) * 100);
        const temp = await IssuesService.update(req.params.iId, { progress: progress })
        resOk(res, data)
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
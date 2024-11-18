const { resOk } = require("../helpers/utils");
const IssuesService = require("../services/issues");
const createError = require('http-errors');
const StatusService = require("../services/issues.status");
const TrackerService = require("../services/issues.tracker");
const PriorityService = require("../services/issues.priority");
const UserService = require("../services/user");

const get = async (req, res, next) => {
    try {
        const data = await IssuesService.read(req.params.id)
        if (!data) {
            return next(createError.BadRequest())
        }
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const gets = async (req, res, next) => {
    try {
        let query = {}
        if (req.query.assignee) { query.assignee = req.query.assignee }
        if (req.query.owner) { query.createBy = req.query.owner }
        if (req.query.project){ query.priorityId  = req.query.project}
        console.log("quyery ====:> ", query)
        console.log("quyery1 ====:> ", req.query)
        const data = await IssuesService.readsQuery(query)
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
        const data = await IssuesService.readsByProject(req.params.pId)
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
        //check
        if (req.body.statusId) {
            const status = await StatusService.read(req.body.statusId)
            if (!status) { return next(createError.BadRequest('Status không có trong dự án')) }
        }
        if (req.body.trackerId) {
            const tracker = await TrackerService.read(req.body.trackerId)
            if (!tracker) { return next(createError.BadRequest('Tracker không có trong dự án')) }
        }
        if (req.body.priorityId) {
            const priority = await PriorityService.read(req.body.priorityId)
            if (!priority) { return next(createError.BadRequest('Priority không có trong dự án')) }
        }
        if (req.body.assignee) {
            const user = await UserService.read(req.body.assignee)
            if (!user) { return next(createError.BadRequest('User không có trong dự án')) }
        }
        if (req.body.parentId) {
            const parent = await IssuesService.read(req.body.parentId)
            if (!parent) { return next(createError.BadRequest('Issues parent không có trong dự án')) }
            if (parent.projectId != req.params.pId) {
                return next(createError.BadRequest('Issues parent không cùng dự án'))
            }
            
        }
        req.body.projectId = req.params.pId
        req.body.created = new Date()
        req.body.createBy = req.user.id
        const data = await IssuesService.create(req.body)
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
        if (req.body.statusId) {
            const status = await StatusService.read(req.body.statusId)
            if (!status) { return next(createError.BadRequest('Status không có trong dự án')) }
        }
        if (req.body.trackerId) {
            const tracker = await TrackerService.read(req.body.trackerId)
            if (!tracker) { return next(createError.BadRequest('Tracker không có trong dự án')) }
        }
        if (req.body.priorityId) {
            const priority = await PriorityService.read(req.body.priorityId)
            if (!priority) { return next(createError.BadRequest('Priority không có trong dự án')) }
        }
        if (req.body.assignee) {
            const user = await UserService.read(req.body.assignee)
            if (!user) { return next(createError.BadRequest('User không có trong dự án')) }
        }
        if (req.body.parentId) {
            const parent = await IssuesService.read(req.body.parentId)
            if (!parent) { return next(createError.BadRequest('Issues không có trong dự án')) }
            if (parent.projectId != req.params.pId) {
                return next(createError.BadRequest('Issues parent không cùng dự án'))
            }
        }
        const data = await IssuesService.update(req.params.id, req.body);
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
        const data = await IssuesService.delete(req.params.id)
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
    gets,
    getsByProject,
    create,
    update,
    del
}
const { resOk } = require("../helpers/utils");
const IssuesService = require("../services/issues");
const createError = require('http-errors');
const StatusService = require("../services/issues.status");
const TrackerService = require("../services/issues.tracker");
const PriorityService = require("../services/issues.priority");
const UserService = require("../services/user");
const MemberService = require("../services/project.member");
const NoteService = require("../services/issues.note");
const CheckListService = require("../services/issues.check-list");
const CommentService = require("../services/issues.comment");

const get = async (req, res, next) => {
    try {
        let rs = {}
        const data = await IssuesService.read(req.params.id)
        if (!data) {
            return next(createError.BadRequest())
        }
        //thêm comment note, checklist
        const note = await NoteService.readsByIssue(req.params.id)
        const checkList = await CheckListService.readsByIssue(req.params.id)
        const comment = await CommentService.readsByIssue(req.params.id)
        rs.Issue = data
        rs.Note = note
        rs.CheckList = checkList
        rs.Comment = comment
        resOk(res, rs)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const gets = async (req, res, next) => {
    try {
        // check quyền
        let query = {}
        const member = await MemberService.readsByUser(req.user.id)
        query.projectId = member.map(item => item.projectId)
        if (req.query.project){
            if (!query.projectId.includes(parseInt(req.query.project))){
                return next(createError.Forbidden("Bạn chưa tham gia project này"))
            }else{
                query.priorityId = req.query.project
            }
        }
        if (req.query.assignee) { query.assignee = req.query.assignee }
        if (req.query.owner) { query.createBy = req.query.owner }
        if (req.query.tracker) { query.trackerId = req.query.tracker }
        if (req.query.priority) { query.priorityId = req.query.priority }
        if (req.query.status) { query.statusId = req.query.status }
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
            const user = await MemberService.readByProjectUser(req.params.pId, req.body.assignee)
            if (!user) { return next(createError.BadRequest('User không có trong dự án hoặc hệ thống')) }
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
        const checkIssue = await IssuesService.read(req.params.id)
        if (!checkIssue) { return next(createError.NotFound('Issue không có trong hệ thống')) }
        if (checkIssue.createBy != req.user.id) { return next(createError.Forbidden('bạn không phải là owner của issue này')) }
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
// chặn update và chia theo thành từng chức năng
const updateStatus = async (req, res, next) => {
    try {
        if (!req.body.statusId) {
            return next(createError.BadRequest('statusId need have in body'))
        }
        const status = await StatusService.read(req.body.statusId)
        if (!status) { return next(createError.BadRequest('Status không có trong dự án')) }

        const data = await IssuesService.update(req.params.id, {
            statusId: req.body.statusId,
            updated: new Date()
        });
        if (!data) {
            return next(createError.BadRequest())
        }
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const updateDue = async (req, res, next) => {
    try {
        let input = { updated: new Date() }
        if (req.body.start) {
            input.start = req.body.start
        }
        if (req.body.end) {
            input.end = req.body.end
        }
        const data = await IssuesService.update(req.params.id, input);
        if (!data) {
            return next(createError.BadRequest())
        }
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const updateContent = async (req, res, next) => {
    try {
        let input = { updated: new Date() }
        if (req.body.name) {
            input.name = req.body.name
        }
        if (req.body.progress) {
            input.progress = req.body.progress
        }
        if (req.body.trackerId) {
            const tracker = await TrackerService.read(req.body.trackerId)
            if (!tracker) { return next(createError.BadRequest('Tracker không có trong dự án')) }
            input.trackerId = req.body.trackerId
        }
        if (req.body.priorityId) {
            const priority = await PriorityService.read(req.body.priorityId)
            if (!priority) { return next(createError.BadRequest('Priority không có trong dự án')) }
            input.priorityId = req.body.priorityId

        }
        if (req.body.parentId) {
            if (req.body.parentId == req.params.id) {
                return next(createError.BadRequest('Issues parent không được trùng với issue hiện tại'))

            }
            const parent = await IssuesService.read(req.body.parentId)
            if (!parent) { return next(createError.BadRequest('Issues không có trong dự án')) }
            if (parent.projectId != req.params.pId) {
                return next(createError.BadRequest('Issues parent không cùng dự án'))
            }
            input.parentId = req.body.parentId

        }
        const data = await IssuesService.update(req.params.id, input);
        if (!data) {
            return next(createError.BadRequest())
        }
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const updateAssignee = async (req, res, next) => {
    try {
        if (!req.body.userId) {
            return next(createError.BadRequest('userId need have in body'))
        }
        const member = await MemberService.readByProjectUser(req.params.pId, req.body.userId)
        if (!member) { return next(createError.BadRequest('user này không có trong dự án hoặc hệ thống')) }
        const data = await IssuesService.update(req.params.id, {
            assignee: req.body.userId,
            updated: new Date()
        });
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
    create,
    update,
    updateAssignee,
    updateContent,
    updateDue,
    updateStatus,
    del
}

/*
đặt thù của issue

đọc: có phân quyền 

create: có phân quyền

edit chia thành 2 loại (người tạo isuce thì có full quyền sửa)
loại 1: edit trạng thái: status
loại 2: edit thời gian: start, end (dùng cho quản lý)
loại 3: edit phân công: assignee (dùng cho quản lý)
loại 4: edit nội dung: các thuộc tính còn lại (name,trackerId, priorityId,progress,parentId)

xóa (người tạo có quyền xóa), có phân quyền




*/
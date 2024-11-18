const { resOk } = require("../helpers/utils");
const TrackerService = require("../services/issues.tracker");
const createError = require('http-errors');
const ProjectService = require("../services/project");
const MemberService = require("../services/project.member");
const PriorityService = require("../services/issues.priority");
const StatusService = require("../services/issues.status");
const ProjectRoleService = require("../services/project.role");
const MemberRoleService = require("../services/project.member-role");

const get = async (req, res, next) => {
    try {
        
        const project = await ProjectService.read(req.params.pId);
        if (!project) {
            return next(createError.BadRequest())
        }
        const member = await MemberService.readsByProject(project.id);
        const role = await ProjectRoleService.readsByProject(project.id);
        const tracker = await TrackerService.readsByProject(project.id);
        const priority = await PriorityService.readsByProject(project.id);
        const status = await StatusService.readsByProject(project.id);
        resOk(res, {
            project: project,
            member:member,
            role:role,
            tracker:tracker,
            priority:priority,
            status:status
        })
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
}
const gets = async (req, res, next) => {
    try {
        if (req.user.admin) {
            resOk(res, await ProjectService.reads(req.params.pId))
            return
        }
        const members = await MemberService.readsByUser(req.user.id)
        console.log(members)
        if (!members || members.length <= 0) {
            return next(createError.NotFound('you dont have or join project'))
        }
        const ids = members.map(item => item.projectId);
        const data = await ProjectService.readsByIds(ids);
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
}
const create = async (req, res, next) => {
    try {
        //create and tamplate
        //project
        req.body.created = new Date()
        const project = await ProjectService.create(req.body)
        if (!project) {
            return next(createError.BadRequest())
        }
        //tracker 
        const tracker = await TrackerService.creates([
            { name: "Story", projectId: project.id },
            { name: "Task", projectId: project.id },
            { name: "bug", projectId: project.id },
        ])
        //priority
        const priority = await PriorityService.creates([
            { name: "Nomal", projectId: project.id },
            { name: "Hight", projectId: project.id },
            { name: "Very Hight", projectId: project.id },
        ])
        //status
        const status = await StatusService.creates([
            { name: "To do", projectId: project.id },
            { name: "Doing", projectId: project.id },
            { name: "Done", projectId: project.id },
        ])
        //role
        const role = await ProjectRoleService.create(
            { name: "Admin", projectId: project.id })
        //add member
        const member = await MemberService.create({ projectId: project.id, userId: req.user.id })
        //add member role admin
        const memberRole = await MemberRoleService.create({memberId: member.id, roleId: role.id})
        resOk(res, project)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const update = async (req, res, next) => {
    try {
        const data = await ProjectService.update(req.params.pId, req.body);
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
        const data = await ProjectService.delete(req.params.pId)
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
    del
}
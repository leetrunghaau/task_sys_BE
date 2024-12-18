const { resOk } = require("../helpers/utils");
const createError = require('http-errors');
const PermissionService = require("../services/project.permission");
const RolePermissionService = require("../services/project.role-permission");
const ProjectRoleService = require("../services/project.role");

const gets = async (req, res, next) => {
    try {
        const data = await PermissionService.reads()
        if (!data) {
            return next(createError.BadRequest())
        }
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};

const getsByRole = async (req, res, next) => {
    try {
        const per = await PermissionService.reads()
        if (!per) {
            return next(createError.BadRequest())
        }
        const perRole = await RolePermissionService.readsByRole(req.params.rId)
        const perRoleId = perRole.map(item => item.permissionId)
        const rs = per.map(item => {
            return {
                id: item.id,
                name: item.name,
                description: item.description,
                group: item.group,
                checked: perRoleId.includes(item.id) ? true : false
            }
        })
        resOk(res, rs)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const create = async (req, res, next) => {
    try {
        //check permissionId
        const permission = await PermissionService.read(req.body.permissionId);
        if (!permission) {
            return next(createError.BadRequest("permission này không có trong hệ thống"))
        }
        //check role
        const role = await ProjectRoleService.read(req.params.rId);
        if (!role) {
            return next(createError.NotFound("role này không có trong hệ thống"))
        }
        //check member role
        const rolePermission = await RolePermissionService.readByRolePermission(
            req.params.rId,
            req.body.permissionId
        );
        if (rolePermission) {
            resOk(res, rolePermission);
            return;
        }
        //create
        const data = await RolePermissionService.create({
            roleId: req.params.rId,
            permissionId: req.body.permissionId
        })
        if (!data) { return next(createError.BadRequest()) }
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
const del = async (req, res, next) => {
    try {
        //check role
        const rolePermission = await RolePermissionService.readByRolePermission(
            req.params.rId,
            req.params.id
        );
        if (!rolePermission) { resOk(res, true); return; }
        //create
        const data = await RolePermissionService.delete(rolePermission.id)
        if (!data) { return next(createError.BadRequest()) }
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};
module.exports = {
    gets,
    getsByRole,
    create,
    del
}


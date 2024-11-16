const Permission = require('../models/project.permission');
const RolePermission = require('../models/project.role-permission');
class RolePermissionService {
    static async read(id) {
        return await RolePermission.findOne({ where: { id: id } }) || null
    }
    static async readByRolePermission(roleId, permissionId) {
        return await RolePermission.findOne({ where: { roleId: roleId, permissionId: permissionId } }) || null
    }
    static async reads() {
        return await RolePermission.findAll() || null
    }
    static async readsByRole(id) {
        return await RolePermission.findAll({
            where: { roleId: id },
            include: [{ model: Permission }]
        }) || null
    }
    static async create(data) {
        return await RolePermission.create(data) || null;
    }
    static async update(id, data) {
        await RolePermission.update(data, { where: { id: id } }) || null;
        return this.read(id)
    }
    static async delete(id) {
        return await RolePermission.destroy({ where: { id: id } })
    }
}
module.exports = RolePermissionService;

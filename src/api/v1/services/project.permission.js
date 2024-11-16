const Permission = require('../models/project.permission');
class PermissionService {
    static async read(id) {
        return await Permission.findOne({ where: { id: id } }) || null
    }
    static async reads() {
        return await Permission.findAll() || null
    }
    static async create(data) {
        return await Permission.create(data) || null;
    }
    static async update(id, data) {
        await Permission.update(data, { where: { id: id } }) || null;
        return this.read(id)
    }
    static async delete(id) {
        return await Permission.destroy({ where: { id: id } })
    }
}
module.exports = PermissionService;
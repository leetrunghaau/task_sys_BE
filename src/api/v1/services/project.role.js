const ProjectRole = require('../models/project.role');
class ProjectRoleService {
    static async read(id) {
        return await ProjectRole.findOne({ where: { id: id } }) || null
    }
    static async reads() {
        return await ProjectRole.findAll() || null
    }
    static async create(data) {
        return await ProjectRole.create(data) || null;
    }
    static async update(id, data) {
        await ProjectRole.update(data, { where: { id: id } }) || null;
        return this.read(id)
    }
    static async delete(id) {
        return await ProjectRole.destroy({ where: { id: id } })
    }
}
module.exports = ProjectRoleService;

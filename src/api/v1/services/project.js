const Project = require('../models/project');
class ProjectService {
    static async read(id) {
        return await Project.findOne({ where: { id: id } }) || null
    }
    static async reads() {
        return await Project.findAll() || null
    }
    static async create(data) {
        return await Project.create(data) || null;
    }
    static async update(id, data) {
        await Project.update(data, { where: { id: id } }) || null;
        return this.read(id)
    }
    static async delete(id) {
        return await Project.destroy({ where: { id: id } })
    }
}
module.exports = ProjectService;

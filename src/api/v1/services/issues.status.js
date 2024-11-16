const Status = require('../models/issues.status');
class StatusService {
    static async read(id) {
        return await Status.findOne({ where: { id: id } }) || null
    }
    static async reads() {
        return await Status.findAll() || null
    }
    static async readsByProject(id) {
        return await Status.findAll({ where: { projectId: id } }) || null
    }
    static async create(data) {
        return await Status.create(data) || null;
    }
    static async creates(data) {
        return await Status.bulkCreate(data) || null;
    }
    static async update(id, data) {
        await Status.update(data, { where: { id: id } }) || null;
        return this.read(id)
    }
    static async delete(id) {
        return await Status.destroy({ where: { id: id } })
    }
}
module.exports = StatusService;

const Issues = require('../models/issues');
class IssuesService {
    static async read(id) {
        return await Issues.findOne({ where: { id: id } }) || null
    }
    static async reads() {
        return await Issues.findAll() || null
    }
    static async readsByProject(id) {
        return await Issues.findAll({ where: { projectId: id } }) || null
    }
    static async create(data) {
        return await Issues.create(data) || null;
    }
    static async update(id, data) {
        await Issues.update(data, { where: { id: id } }) || null;
        return this.read(id)
    }
    static async delete(id) {
        return await Issues.destroy({ where: { id: id } })
    }
}
module.exports = IssuesService;

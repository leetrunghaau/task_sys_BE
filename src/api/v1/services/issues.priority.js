const Priority = require('../models/issues.priority');
class PriorityService {
    static async read(id) {
        return await Priority.findOne({ where: { id: id } }) || null
    }
    static async reads() {
        return await Priority.findAll() || null
    }
    static async create(data) {
        return await Priority.create(data) || null;
    }
    static async update(id, data) {
        await Priority.update(data, { where: { id: id } }) || null;
        return this.read(id)
    }
    static async delete(id) {
        return await Priority.destroy({ where: { id: id } })
    }
}
module.exports = PriorityService;

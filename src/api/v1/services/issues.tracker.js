const Tracker = require('../models/issues.tracker');
class TrackerService {
    static async read(id) {
        return await Tracker.findOne({ where: { id: id } }) || null
    }
    static async reads() {
        return await Tracker.findAll() || null
    }
    static async readsByProject(id) {
        return await Tracker.findAll({ where: { projectId: id } }) || null
    }
    static async create(data) {
        return await Tracker.create(data) || null;
    }
    static async creates(data){
        return await Tracker.bulkCreate(data) || null
    }
    static async update(id, data) {
        await Tracker.update(data, { where: { id: id } }) || null;
        return this.read(id)
    }
    static async delete(id) {
        return await Tracker.destroy({ where: { id: id } })
    }
}
module.exports = TrackerService;

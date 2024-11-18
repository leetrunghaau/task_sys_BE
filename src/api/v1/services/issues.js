const Issues = require('../models/issues');
const Priority = require('../models/issues.priority');
const Status = require('../models/issues.status');
const Tracker = require('../models/issues.tracker');
const User = require('../models/user');
class IssuesService {
    static async read(id) {
        return await Issues.findOne({
            where: { id: id },
            include: [
                { model: Issues, as: "Parent" },
                { model: Tracker },
                { model: Priority },
                { model: Status },
                { model: User, as: "Assignee", attributes: ["name", "userName", "email"] },
                { model: User, as: "Owner", attributes: ["name", "userName", "email"] }
            ]
        }) || null
    }
    static async reads() {
        return await Issues.findAll() || null
    }
    static async readsQuery(query) {
        return await Issues.findAll({ where: query }) || null
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

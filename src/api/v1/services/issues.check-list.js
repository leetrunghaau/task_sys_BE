const CheckList = require('../models/issues.check-list');
class CheckListService {
    static async read(id) {
        return await CheckList.findOne({ where: { id: id } }) || null
    }
    static async reads() {
        return await CheckList.findAll() || null
    }
    static async readsByIssue(issuesId) {
        return await CheckList.findAll({ where: { issuesId: issuesId } }) || null
    }
    static async create(data) {
        return await CheckList.create(data) || null;
    }
    static async creates(data) {
        return await CheckList.bulkCreate(data);
    }
    static async update(id, data) {
        await CheckList.update(data, { where: { id: id } }) || null;
        return this.read(id)
    }
    static async delete(id) {
        return await CheckList.destroy({ where: { id: id } })
    }
}
module.exports = CheckListService;

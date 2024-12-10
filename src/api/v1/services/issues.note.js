const Note = require('../models/issues.note');
class NoteService {
    static async read(id) {
        return await Note.findOne({ where: { id: id } }) || null
    }
    static async readsByIssue(id) {
        return await Note.findAll({where: {issuesId: id}}) || null
    }
    static async reads() {
        return await Note.findAll() || null
    }
    static async readsByIssue(issuesId) {
        return await Note.findAll({ where: { issuesId: issuesId } }) || null
    }
    static async create(data) {
        return await Note.create(data) || null;
    }
    static async creates(data) {
        return await Note.bulkCreate(data);
    }
    static async update(id, data) {
        await Note.update(data, { where: { id: id } }) || null;
        return this.read(id)
    }
    static async delete(id) {
        return await Note.destroy({ where: { id: id } })
    }
}
module.exports = NoteService;

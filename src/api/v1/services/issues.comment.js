const Comment = require('../models/issues.comment');
class CommentService {
    static async read(id) {
        return await Comment.findOne({ where: { id: id } }) || null
    }
    static async reads() {
        return await Comment.findAll({ include: [{ model: Comment, as: 'Chillrend'}] }) || null
    }
    static async readsByIssue(id) {
        return await Comment.findAll({ 
            where: {issuesId: id},
            include: [{ model: Comment, as: 'Chillrend'}] 
        }) || null
    }
    static async readsByIssue(issuesId) {
        return await Comment.findAll({ where: { issuesId: issuesId }, include: [{ model: Comment, as: 'Chillrend'}] }) || null
    }
    static async create(data) {
        return await Comment.create(data) || null;
    }
    static async update(id, data) {
        await Comment.update(data, { where: { id: id } }) || null;
        return this.read(id)
    }
    static async delete(id) {
        return await Comment.destroy({ where: { id: id } })
    }
}
module.exports = CommentService;

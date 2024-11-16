const Member = require('../models/project.member');
class MemberService {
    static async read(id) {
        return await Member.findOne({ where: { id: id } }) || null
    }
    static async readByProjectMember(projectId, memberID) {
        return await Member.findOne({ where: { projectId: projectId, userId: memberID } }) || null
    }
    static async reads() {
        return await Member.findAll() || null
    }
    static async readsByUser(userId) {
        return await Member.findAll({ where: { userId: userId } }) || null
    }
    static async readsByProject(id) {
        return await Member.findAll({ where: { projectId: id } }) || null
    }
    static async readByProjectUser(projectId, userId) {
        return await Member.findOne({
            where: {
                userId: userId,
                projectId: projectId
            }
        }) || null
    }
    static async create(data) {
        return await Member.create(data) || null;
    }
    static async update(id, data) {
        await Member.update(data, { where: { id: id } }) || null;
        return this.read(id)
    }
    static async delete(id) {
        return await Member.destroy({ where: { id: id } })
    }
}
module.exports = MemberService;

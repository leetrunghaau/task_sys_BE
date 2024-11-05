const Member = require('../models/project.member');
class MemberService {
    static async read(id) {
        return await Member.findOne({ where: { id: id } }) || null
    }
    static async reads() {
        return await Member.findAll() || null
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

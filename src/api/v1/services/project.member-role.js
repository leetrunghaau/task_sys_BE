const MemberRole = require('../models/project.member-role');
class MemberRoleService {
    static async read(id) {
        return await MemberRole.findOne({ where: { id: id } }) || null
    }
    static async reads() {
        return await MemberRole.findAll() || null
    }
    static async create(data) {
        return await MemberRole.create(data) || null;
    }
    static async update(id, data) {
        await MemberRole.update(data, { where: { id: id } }) || null;
        return this.read(id)
    }
    static async delete(id) {
        return await MemberRole.destroy({ where: { id: id } })
    }
}
module.exports = MemberRoleService;

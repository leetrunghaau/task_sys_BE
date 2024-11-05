const Account = require('../models/user.account');
class AccountService {
    static async read(id) {
        return await Account.findOne({ where: { id: id } }) || null
    }
    static async readByUserId(id) {
        return await Account.findOne({ where: { userId : id } }) || null
    }
    static async reads() {
        return await Account.findAll() || null
    }
    static async create(data) {
        return await Account.create(data) || null;
    }
    static async update(id, data) {
        await Account.update(data, { where: { id: id } }) || null;
        return this.read(id)
    }
    static async delete(id) {
        return await Account.destroy({ where: { id: id } })
    }
}
module.exports = AccountService;

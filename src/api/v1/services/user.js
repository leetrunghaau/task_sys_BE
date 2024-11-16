const User = require('../models/user');
const { Op } = require('sequelize');
class UserService {
    static async read(id) {
        return await User.findOne({ where: { id: id } }) || null
    }
    static async readByEmail(email) {
        return await User.findOne({ where: { email: email } }) || null
    }
    static async readByUserName(userName) {
        return await User.findOne({ where: { userName: userName } }) || null
    }
    static async readsByUserName(userName) {
        return await User.findAll({
            where: { userName: { [Op.like]: `${userName}%` } },
            attributes: ["id", "name", "userName", "email"]
        }) || null
    }
    static async reads() {
        return await User.findAll() || null
    }
    static async create(data) {
        return await User.create(data) || null;
    }
    static async update(id, data) {
        await User.update(data, { where: { id: id } }) || null;
        return this.read(id)
    }
    static async delete(id) {
        return await User.destroy({ where: { id: id } })
    }
}
module.exports = UserService;

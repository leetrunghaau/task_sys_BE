const { resOk } = require("../helpers/utils");
const createError = require('http-errors');
const UserService = require("../services/user");
const AccountService = require("../services/user.account");
const { comparePasswords, hashPassword } = require("../helpers/password-crypt");

const get = async (req, res, next) => {
    try {
        const data = await UserService.read(req.User.id);
        if (!data) {
            return next(createError.BadRequest())
        }
        resOk(res, data);
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
}
const update = async (req, res, next) => {
    try {
        // check user name
        if (req.body.userName != req.User.userName) {
            const checkUserName = await UserService.readByUserName(req.body.userName);
            if (checkUserName) {
                return next(createError.BadRequest('user name đã tồn tại'));
            }
        }

        // check email
        if (req.body.email != req.User.email) {
            const checkEmail = await UserService.readByEmail(req.body.email);
            if (checkEmail) {
                return next(createError.BadRequest('email đã tồn tại'));
            }
        }
        req.body.admin = 0;
        delete req.body.admin
        req.body.modified = new Date()
        const data = await UserService.update(req.User.id, req.body);
        if (!data) {
            return next(createError.BadRequest())
        }
        resOk(res, data);
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
}
const changePass = async (req, res, next) => {
    try {
        const user = await UserService.read(req.User.id);
        if (!user) {
            return next(createError.Forbidden())
        }
        const acc = await AccountService.readByUserId(user.id);
        if (!acc) {
            return next(createError.Forbidden())
        }
        const checkpass = await comparePasswords(req.body.oldPass, acc.pass)
        if (!checkpass){
            return next(createError.BadRequest())
        }
        const data = await AccountService.update(acc.id, { pass: await hashPassword(req.body.newPass) })
        if (!data) {
            return next(createError.InternalServerError())
        }
        resOk(res, data);
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
}
module.exports = {
    get,
    update,
    changePass

}
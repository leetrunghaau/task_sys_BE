const createError = require('http-errors');
const UserService = require("../services/user");
const { resOk } = require('../helpers/utils');
const AccountService = require('../services/user.account');
const { hashPassword } = require('../helpers/password-crypt');

const get = async (req, res, next) => {
    try {
        const data = await UserService.read(req.params.id)
        if (!data) {
            return next(createError.BadRequest())
        }
        resOk(res, data);
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
}
const gets = async (req, res, next) => {
    try {
        const data = await UserService.reads()
        if (!data) {
            return next(createError.BadRequest())
        }
        resOk(res, data);
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
}

const create = async (req, res, next) => {
    try {
        const checkUserName = await UserService.readByUserName(req.body.userName);
        if (checkUserName) {
            return next(createError.BadRequest('User name đã tồn tại '))
        }
        const checkEmail = await UserService.readByEmail(req.body.email);
        if (checkEmail) {
            return next(createError.BadRequest('Email đã tồn tại '))
        }
        req.body.created = new Date();
        req.body.modified = new Date();
        const data = await UserService.create(req.body)
        if (!data) {
            return next(createError.BadRequest())
        }
        const accData = {
            userId: data.id,
            pass: await hashPassword(req.body.pass)
        }
        const acc = await AccountService.create(accData);
        resOk(res, data);
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
}

const edit = async (req, res, next) => {
    try {

        const user = await UserService.read(req.params.id)
        if (!user) {
            return next(createError.BadRequest('Id user không tồn tại'))
        }
        // check user name
        if (req.body.userName && req.body.userName != user.userName) {
            const checkUserName = await UserService.readByUserName(req.body.userName);
            if (checkUserName) {
                return next(createError.BadRequest('user name đã tồn tại'));
            }
        }
        // check email
        if (req.body.email && req.body.email != user.email) {
            const checkEmail = await UserService.readByEmail(req.body.email);
            if (checkEmail) {
                return next(createError.BadRequest('email đã tồn tại'));
            }
        }
        req.body.modified = new Date()
        const data = await UserService.update(req.params.id, req.body)
        if (!data) {
            return next(createError.BadRequest())
        }
        resOk(res, data);
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
}
const rePass = async (req, res, next) => {
    try {
        const user = await UserService.read(req.params.id);
        if(!user){
            return next(createError.BadRequest("user id không tồn tại"))
        }
        const acc = await AccountService.readByUserId(user.id);
        if(!acc){
            const accData = {
                userId: req.params.id,
                pass: await hashPassword(req.body.pass)
            }
            const acc = await AccountService.create(accData);
        }else{
            const data = await AccountService.update(acc.id, {pass: await hashPassword(req.body.pass)} )
            if (!data) {
                return next(createError.InternalServerError())
            }
        }
        resOk(res, {pass: req.body.pass});
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
}
const del = async (req, res, next) => {
    try {
        const data = await UserService.delete(req.params.id)
        if (data == 0) {
            return next(createError.BadRequest())
        }
        resOk(res, data);
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
}
const findByUName = async (req, res, next) => {
    try {
        const data = await UserService.readsByUserName(req.params.uName)
        if (data < 0) {
            return next(createError.BadRequest())
        }
        resOk(res, data)
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};

module.exports = {
    get,
    gets,
    create,
    edit,
    del,
    rePass,
    findByUName
}

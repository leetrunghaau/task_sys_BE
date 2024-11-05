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
        req.body.created = new Date();
        req.body.modified = new Date();
        const data = await UserService.create(req.body)
        if (!data) {
            return next(createError.BadRequest())
        }
        resOk(res, data);
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
}

const edit = async (req, res, next) => {
    try {
        let { id, ...data } = req.body;
        data = await UserService.update(data)
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
        const user = await UserService.read(req.body.id);
        if(!user){
            return next(createError.BadRequest())
        }
        const acc = await AccountService.readByUserId(user.id);
        if(!acc){
            return next(createError.BadRequest())
        }
        const data = await AccountService.update(acc.id, {pass: await hashPassword(req.body.pass)} )
        if (!data) {
            return next(createError.InternalServerError())
        }
        resOk(res, data);
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
module.exports = {
    get,
    gets,
    create,
    edit,
    del,
    rePass
}

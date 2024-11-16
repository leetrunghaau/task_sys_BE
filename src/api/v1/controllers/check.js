const { resOk } = require("../helpers/utils");
const UserService = require("../services/user");
const createError = require('http-errors');

const checkUserName = async (req, res, next) => {
    try {
        const checkUserName = await UserService.readByUserName(req.body.userName);
        if (checkUserName) {
            resOk(res, true, "User name đã được đăng ký");
        }else{

            resOk(res, false, "User name chưa được đăng ký");
        }
    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
}
const checkEmail = async (req, res, next) => {
    try {
        const checkEmail = await UserService.readByEmail(req.body.email);
        if (checkEmail) {
            resOk(res, true, "Email đã được đăng ký");
        }else{

            resOk(res, false, "Email chưa được đăng ký");
        }

    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};

module.exports = {
    checkUserName,
    checkEmail
}
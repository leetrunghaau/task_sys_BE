const { date } = require("joi");
const { generateId, accessTokenSecret, generateCode } = require("../helpers/generate-key");
const { generateAccessToken, generateVerificationToken } = require("../helpers/jwt");
const { hashPassword, comparePasswords } = require("../helpers/password-crypt");
const createError = require('http-errors');
const { sendCodeForRegister, sendCodeForResetPassword } = require("../helpers/mailer");
const UserService = require("../services/user");
const { isValidEmail, resOk } = require("../helpers/utils");
const AccountService = require("../services/user.account");

const signIn = async (req, res, next) => {
    try {
       
        let user = null;
        if (isValidEmail(req.body.user)) {
            user = await UserService.readByEmail(req.body.user);
        } else {
            user = await UserService.readByUserName(req.body.user);
        }
        if (!user) {
            return next(createError.BadRequest('user not found'));
        }
        const acc = await AccountService.readByUserId(user.id);
        if (!acc) {
            return next(createError.BadRequest('Account not found'));
        }
        const checkPass = await comparePasswords(req.body.pass, acc.pass);
        if (checkPass === false) {
            return next(createError.BadRequest('password not match'));
        }
        const token = await generateAccessToken(user.id);
        resOk(res, { admin: user.admin, token: token })

    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};

const signUp = async (req, res, next) => {
    try {

        // check user name
        const checkUserName = await UserService.readByUserName(req.body.userName);
        console.log("user: ", checkUserName)
        if (checkUserName) {
            return next(createError.BadRequest('user name đã tồn tại'));
        }
        // check email
        const checkEmail = await UserService.readByEmail(req.body.email);
        console.log("email.: ", checkEmail)
        if (checkEmail) {
            return next(createError.BadRequest('email đã tồn tại'));
        }
        const userData = {
            name: req.body.name,
            userName: req.body.userName,
            email: req.body.email,
            admin: false,
            created: new Date(),
            modified: new Date()
        }
        const user = await UserService.create(userData);
        const accData = {
            userId: user.id,
            pass: await hashPassword(req.body.pass)
        }
        const acc = await AccountService.create(accData);
        return res.status(201).json({
            status: 201,
            message: 'User registered successfully',
            data: user
        });

    } catch (error) {
        console.log(error);
        return next(createError.InternalServerError());
    }
};

module.exports = {
    signUp,
    signIn,
   
}
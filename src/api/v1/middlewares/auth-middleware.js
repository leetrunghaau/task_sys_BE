// jwtMiddleware.js
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const UserService = require('../services/user');

const authorization = admin => {
    return async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(createError.Unauthorized());
        }
        const token = authHeader.split(' ')[1];

        try {
            const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await UserService.read(payload.userId);
            req.User = user;
            if (!user) {
                return next(createError.Forbidden());
            }
            if (admin){
                if (!user.admin){
                    return next(createError.Forbidden());
                }
            }
            next();
        } catch (err) {
            return next(createError.Unauthorized(err.message));
        }
    };
};

// const verificationAuthorization = () => {
//     return (req, res, next) => {
//         if (!req.headers['authorization']) {
//             return next(createError.Unauthorized())
//         }
//         const authHeader = req.headers['authorization'];
//         const bearerToken = authHeader.split(' ');
//         const token = bearerToken[1];
//         console.log(token);
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
//             if (err) {

//                 return next(createError.Unauthorized(err.message));
//             }
//             console.log(payload);
//             req.userId = payload.userId;
//             req.verificationCode = payload.dType
//             const user = UserService.getUserById(payload.userId);
//             if (!user) {
//                 return next(createError[401]('Đang giả danh hả, cutsttttt :))))'))
//             }

//             next();
//         })
//     }
// }
module.exports = {
    authorization
    // verificationAuthorization
}
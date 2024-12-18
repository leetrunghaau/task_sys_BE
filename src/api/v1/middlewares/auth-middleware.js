// jwtMiddleware.js
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const UserService = require('../services/user');
const MemberRoleService = require('../services/project.member-role');
const MemberService = require('../services/project.member');
const RolePermissionService = require('../services/project.role-permission');
const ProjectService = require('../services/project');
const CommentService = require('../services/issues.comment');
const IssuesService = require('../services/issues');

function checkCommonElement(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) {
            return true; 
        }
    }
    return false; 
}


const authorization = (admin, permission = null, owner = null) => {
    return async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(createError.Unauthorized());
        }
        const token = authHeader.split(' ')[1];

        try {
            const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await UserService.read(payload.userId);
            req.user = user;
            if (!user) { // kiểm tra token
                return next(createError.Forbidden("check poid 1"));
            }
            // tới đấy là authen
            if (admin) { //kiểm tra admin (niếu là admin là có  quyền toàn hệ thống)
                if (!user.admin) {
                    return next(createError.Forbidden("check poid 2"));
                }
            }
            if (req.params.pId) { //niếu đường dẫn có truy tìm tới project thì tìm xem có project đó hay không
                const project = await ProjectService.read(req.params.pId)
                if (!project) { return next(createError.NotFound('Project not found')) }
            }
            if (permission) { // niếu có phân quyền thì xử lý phân quyền

                // kiểm tra người dùng có tham gia dự án chưa
                const memberRoles = await MemberRoleService.readsByProjectUser(req.params.pId, user.id)
                if (memberRoles.length <= 0) {
                    return next(createError.Forbidden("Bạn không có quyền nào trong dự án này ! "))
                }
                // lấy danh sách quyền của người dùng đối với dự án
                const roleIds = memberRoles.map(item => item.roleId)
                const rolePermission = await RolePermissionService.readsByRole(roleIds)
                if (rolePermission <= 0) {
                    return next(createError.Forbidden("Bạn không có quyền nào trong dự án"))
                }
                const permissions = rolePermission.map(item => item.Permission.code)
                const checkValue = checkCommonElement(permissions, permission)
                if (!checkValue) {
                    return next(createError.Forbidden("Bạn không có quyền này trong dự án"));

                }
                req.permission = rolePermission
            }
            next();
        } catch (err) {
            return next(createError.Unauthorized(err.message));
        }
    };
};



module.exports = {
    authorization
}
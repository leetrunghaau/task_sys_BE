const express = require('express');
const CheckListService = require('../services/issues.check-list');
const CommentService = require('../services/issues.comment');
const IssuesService = require('../services/issues');
const NoteService = require('../services/issues.note');
const PriorityService = require('../services/issues.priority');
const StatusService = require('../services/issues.status');
const TrackerService = require('../services/issues.tracker');
const ProjectService = require('../services/project');
const MemberService = require('../services/project.member');
const MemberRoleService = require('../services/project.member-role');
const ProjectRoleService = require('../services/project.role');
const AccountService = require('../services/user.account');
const UserService = require('../services/user');
const { resOk } = require('../helpers/utils');
const PermissionService = require('../services/project.permission');
const RolePermissionService = require('../services/project.role-permission');
const router = express.Router();


// Define routes
router.get('/syn_db', async (req, res) => {
    resOk(res,
        {
            data:
                [
                    await CheckListService.reads(),
                    await CommentService.reads(),
                    await IssuesService.reads(),
                    await NoteService.reads(),
                    await PriorityService.reads(),
                    await StatusService.reads(),
                    await TrackerService.reads(),
                    await ProjectService.reads(),
                    await MemberService.reads(),
                    await MemberRoleService.reads(),
                    await ProjectRoleService.reads(),
                    await AccountService.reads(),
                    await UserService.reads(),
                    await PermissionService.reads(),
                    await RolePermissionService.reads()
                ]
        }
    )
});

module.exports = router
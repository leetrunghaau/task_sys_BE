const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const { get, gets, create, update, del, updateContent, updateStatus, updateAssignee, updateDue } = require('../controllers/issues');
const router = express.Router();

router.get('/issuess', authorization(false), gets)
router.get('/project/:pId/issues/:id', authorization(false), get)
router.post('/project/:pId/issues', authorization(false), create)
router.put('/project/:pId/issues/:id', authorization(false), update)
router.put('/project/:pId/issues/:id/content', authorization(false), updateContent)
router.put('/project/:pId/issues/:id/status', authorization(false), updateStatus)
router.put('/project/:pId/issues/:id/assignee', authorization(false), updateAssignee)
router.put('/project/:pId/issues/:id/due', authorization(false), updateDue)
// router.put('/project/:pId/issues/:id/', authorization(false), update)
// router.get('/project/:pId/issuess', authorization(false), getsByProject)
router.delete('/project/:pId/issues/:id', authorization(false), del)
module.exports = router
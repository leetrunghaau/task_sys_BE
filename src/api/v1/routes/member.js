const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const { getsByProject , create, update, del} = require('../controllers/member');
const router = express.Router();

router.get('/project/:pId/members', authorization(false), getsByProject)
router.post('/project/:pId/member', authorization(false), create)
router.delete('/project/:pId/member/:id', authorization(false), del)
module.exports = router
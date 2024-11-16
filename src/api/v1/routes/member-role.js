const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const { create, del} = require('../controllers/member-role');
const router = express.Router();

router.post('/project/:pId/member/:mId/role', authorization(false), create)
router.delete('/project/:pId/member/:mId/role/:id', authorization(false), del)
module.exports = router
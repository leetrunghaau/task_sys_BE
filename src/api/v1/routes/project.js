const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const { get , create, update, del, gets} = require('../controllers/project');
const router = express.Router();

router.get('/project/:pId', authorization(false), get)
router.get('/projects', authorization(false), gets)
router.post('/project', authorization(false), create)
router.put('/project/:pId', authorization(false), update)
router.delete('/project/:pId', authorization(false), del)
module.exports = router
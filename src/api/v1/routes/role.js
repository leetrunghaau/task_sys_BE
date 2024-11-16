const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const { getsByProject , create, update, del} = require('../controllers/role');
const router = express.Router();

router.get('/project/:pId/roles', authorization(false), getsByProject)
router.post('/project/:pId/role', authorization(false), create)
router.put('/project/:pId/role/:id', authorization(false), update)
router.delete('/project/:pId/role/:id', authorization(false), del)
module.exports = router
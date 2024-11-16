const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const { get, getsByProject , create, update, del} = require('../controllers/status');
const router = express.Router();

router.get('/project/:pId/statuses', authorization(false), getsByProject)
router.post('/project/:pId/status', authorization(false), create)
router.put('/project/:pId/status/:id', authorization(false), update)
router.delete('/project/:pId/status/:id', authorization(false), del)
module.exports = router
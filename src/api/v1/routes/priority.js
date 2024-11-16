const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const { get, getsByProject , create, update, del} = require('../controllers/priority');
const router = express.Router();

router.get('/project/:pId/priorities', authorization(false), getsByProject)
router.post('/project/:pId/priority', authorization(false), create)
router.put('/project/:pId/priority/:id', authorization(false), update)
router.delete('/project/:pId/priority/:id', authorization(false), del)
module.exports = router
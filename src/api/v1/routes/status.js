const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const { get, getsByProject , create, update, del} = require('../controllers/status');
const router = express.Router();

router.get('/status/:id', authorization(false), get)
router.get('/status/project/:id', authorization(false), getsByProject)
router.post('/status', authorization(false), create)
router.put('/status', authorization(false), update)
router.delete('/status/:id', authorization(false), del)
module.exports = router
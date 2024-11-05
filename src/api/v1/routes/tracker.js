const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const { get, getsByProject , create, update, del} = require('../controllers/tracker');
const router = express.Router();

router.get('/tracker/:id', authorization(false), get)
router.get('/tracker/project/:id', authorization(false), getsByProject)
router.post('/tracker', authorization(false), create)
router.put('/tracker', authorization(false), update)
router.delete('/tracker/:id', authorization(false), del)
module.exports = router
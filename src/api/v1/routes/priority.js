const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const { get, getsByProject , create, update, del} = require('../controllers/priority');
const router = express.Router();

router.get('/priority/:id', authorization(false), get)
router.get('/priority/project/:id', authorization(false), getsByProject)
router.post('/priority', authorization(false), create)
router.put('/priority', authorization(false), update)
router.delete('/priority/:id', authorization(false), del)
module.exports = router
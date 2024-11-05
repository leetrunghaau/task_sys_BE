const express = require('express');
const { get, gets, create, edit, del, rePass } = require('../controllers/user');
const { authorization } = require('../middlewares/auth-middleware');
const router = express.Router();

router.get('/user/:id', authorization(true), get)
router.get('/users', authorization(true), gets)
router.post('/user', authorization(true), create)
router.put('/user', authorization(true), edit)
router.put('/rep-pass', authorization(true), rePass)
router.delete('/user', authorization(true), del)
module.exports = router
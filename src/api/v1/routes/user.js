const express = require('express');
const { get, gets, create, edit, del, rePass, findByUName } = require('../controllers/user');
const { authorization } = require('../middlewares/auth-middleware');
const router = express.Router();

router.get('/user/:id', authorization(true), get)
router.get('/users/user-name/:uName', findByUName)
router.get('/users', authorization(true), gets)
router.post('/user', authorization(true), create)
router.put('/user/:id', authorization(true), edit)
router.put('/user/reset-pass/:id', authorization(true), rePass)
router.delete('/user/:id', authorization(true), del)
module.exports = router
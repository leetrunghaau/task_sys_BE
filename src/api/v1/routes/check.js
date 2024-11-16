const express = require('express');
const { signUp, signIn } = require('../controllers/sign');
const { checkEmail, checkUserName } = require('../controllers/check');
const router = express.Router();

router.post('/check/email', checkEmail)
router.post('/check/user-name', checkUserName)
module.exports = router
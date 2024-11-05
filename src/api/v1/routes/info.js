const express = require('express');
const { get, update, changePass } = require('../controllers/info');
const { authorization } = require('../middlewares/auth-middleware');
const router = express.Router();

router.get('/info', authorization(false), get)
router.put('/info', authorization(false), update)
router.put('/info/change-pass', authorization(false), changePass)
module.exports = router
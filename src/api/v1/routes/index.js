const express = require('express');
const router = express.Router();
const syn_db = require('./syn_db')
const check = require('./check')
const sign = require('./sign')
const user = require('./user')
const info = require('./info')
const priority = require('./priority')
const status = require('./status')
const tracker = require('./tracker')

router.use(syn_db)
router.use(check)
router.use(sign)
router.use(user)
router.use(info)
router.use(priority)
router.use(status)
router.use(tracker)

module.exports = router;

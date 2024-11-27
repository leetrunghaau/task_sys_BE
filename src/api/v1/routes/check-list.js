const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const {create,creates, update, del } = require('../controllers/check-list');
const router = express.Router();

router.post('/project/:pId/issues/:iId/check-list', authorization(false), create)
router.post('/project/:pId/issues/:iId/check-lists', authorization(false), creates)
router.put('/project/:pId/issues/:iId/check-list/:id', authorization(false), update)
router.delete('/project/:pId/issues/:iId/check-list/:id', authorization(false), del)
module.exports = router
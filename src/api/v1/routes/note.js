const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const {create,creates, update, del } = require('../controllers/note');
const router = express.Router();

router.post('/project/:pId/issues/:iId/note', authorization(false), create)
router.post('/project/:pId/issues/:iId/notes', authorization(false), creates)
router.put('/project/:pId/issues/:iId/note/:id', authorization(false), update)
router.delete('/project/:pId/issues/:iId/note/:id', authorization(false), del)
module.exports = router
const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const {create,getsByIssuce,creates, update, del } = require('../controllers/note');
const router = express.Router();

router.get('/project/:pId/issues/:iId/notes', authorization(false), getsByIssuce)
router.post('/project/:pId/issues/:iId/note', authorization(false), create)
router.post('/project/:pId/issues/:iId/notes', authorization(false), creates)
router.put('/project/:pId/issues/:iId/note/:id', authorization(false), update)
router.delete('/project/:pId/issues/:iId/note/:id', authorization(false), del)
module.exports = router
const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const {gets, getsByIssuce, create, update, del } = require('../controllers/comment');
const router = express.Router();


router.get('/comment', gets)

router.get('/project/:pId/issues/:iId/comments', authorization(false), getsByIssuce)
router.post('/project/:pId/issues/:iId/comment', authorization(false), create)
router.put('/project/:pId/issues/:iId/comment/:id', authorization(false), update)
router.delete('/project/:pId/issues/:iId/comment/:id', authorization(false), del)
module.exports = router
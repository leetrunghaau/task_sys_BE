const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const {gets, create, update, del } = require('../controllers/comment');
const router = express.Router();


router.get('/comment', gets)

router.post('/project/:pId/issues/:iId/comment', authorization(false), create)
router.put('/project/:pId/issues/:iId/comment/:id', authorization(false), update)
router.delete('/project/:pId/issues/:iId/comment/:id', authorization(false), del)
module.exports = router
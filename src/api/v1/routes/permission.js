const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const { gets, create, del } = require('../controllers/permission');
const router = express.Router();

router.get('/permissions', gets)
router.post('/project/:pId/role/:rId/permission', authorization(false), create)
router.delete('/project/:pId/role/:rId/permission/:id', authorization(false), del)
module.exports = router
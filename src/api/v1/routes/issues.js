const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const { get, gets, getsByProject, create, update, del } = require('../controllers/issues');
const router = express.Router();

router.get('/project/:pId/issues/:id', authorization(false), get)
router.get('/project/:pId/issuess', authorization(false), getsByProject)
router.get('/issuess', gets)
router.post('/project/:pId/issues', authorization(false), create)
router.put('/project/:pId/issues/:id', authorization(false), update)
router.delete('/project/:pId/issues/:id', authorization(false), del)
module.exports = router
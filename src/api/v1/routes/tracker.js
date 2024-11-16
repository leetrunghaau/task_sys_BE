const express = require('express');
const { authorization } = require('../middlewares/auth-middleware');
const { getsByProject , create, update, del} = require('../controllers/tracker');
const router = express.Router();

router.get('/project/:pId/trackers', authorization(false), getsByProject)
router.post('/project/:pId/tracker', authorization(false), create)
router.put('/project/:pId/tracker/:id', authorization(false), update)
router.delete('/project/:pId/tracker/:id', authorization(false), del)
module.exports = router
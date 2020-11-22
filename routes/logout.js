const router = require('express').Router();
const controller = require('../controllers/auth');
const middleware = require('../middleware/auth');

router.delete('/', middleware.logout, controller.logout);

module.exports = router;

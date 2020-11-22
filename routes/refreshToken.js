const router = require('express').Router();
const middleware = require('../middleware/auth');
const controller = require('../controllers/auth');

router.post('/', middleware.refresh, controller.refreshToken);

module.exports = router;

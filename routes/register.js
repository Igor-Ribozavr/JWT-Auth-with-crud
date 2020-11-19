const router = require('express').Router();
const controller = require('../controllers/auth');

router.post('/', controller.register);

module.exports = router;

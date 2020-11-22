const passport = require('passport');
const router = require('express').Router();
const controller = require('../controllers/crud');
const middleware = require('../middleware/auth');

router.get('/', middleware.access, controller.getAll);
router.post('/', middleware.access, controller.create);
router.get('/:id', middleware.access, controller.getOneById);
router.patch('/:id', middleware.access, controller.update);
router.delete('/:id', middleware.access, controller.delete);

module.exports = router;

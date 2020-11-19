const passport = require('passport');
const router = require('express').Router();
const controller = require('../controllers/crud');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.getAll
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.create
);
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.getOneById
);
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.update
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.delete
);

module.exports = router;

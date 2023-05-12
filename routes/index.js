const router = require('express').Router();
const auth = require('../middlewares/auth');
const signIn = require('./signin');
const signUp = require('./signup');
const users = require('./users');
const movies = require('./movies');
const NotFoundError = require('../errors/not-found-error');

router.post('/signin', signIn);
router.post('/signup', signUp);

router.use(auth);

router.use('/users', users);
router.use('/movies', movies);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;

const router = require('express').Router();
const auth = require('../middlewares/auth');
const signIn = require('./signin');
const signUp = require('./signup');
const users = require('./users');
const movies = require('./movies');

router.post('/signin', signIn);
router.post('/signup', signUp);

router.use(auth);

router.use('/users', users);
router.use('/movies', movies);

module.exports = router;

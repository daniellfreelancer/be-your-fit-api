var express = require('express');
var router = express.Router();
const { signUp, signIn, signOut } = require('../controllers/usersAppController');


router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);

module.exports = router;
var express = require('express');
var router = express.Router();
const upload = require('../libs/storage');
const { signUp, signIn, signOut, editProfile } = require('../controllers/usersAppController');


router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.put('/update/:id', upload.single('image'), editProfile)

module.exports = router;
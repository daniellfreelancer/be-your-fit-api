var express = require('express');
var router = express.Router();
const upload = require('../libs/storage');
const {addPost, readAllPost , deletePost} = require('../controllers/postUsersController');


router.post('/userpost', upload.single('image'), addPost);
router.get('/posts', readAllPost )
router.delete('/delete/:id', deletePost)


module.exports = router;
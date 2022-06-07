const express = require('express');
const router = express.Router();
const {
    getPosts,
    getPost,
    addPost,
    editPost,
    deletePost,
} = require('../controllers/postsController');
const { protect } = require('../middlewares');
const { PostValidator } = require('../utils/validator/postValidator');

router.get('/', protect, getPosts);
router.get('/:id', protect, getPost);
router.post('/', protect, PostValidator, addPost);
router.put('/:id', protect, PostValidator, editPost);
router.delete('/:id', protect, deletePost);

module.exports = router;

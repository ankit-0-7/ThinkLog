const express = require('express');
const router = express.Router();
const { 
  getPosts, 
  createPost, 
  getPostById, 
  updatePost, 
  deletePost,
  getPostsByUser,
  likePost
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

// Routes for the entire post collection
router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/user/:userId').get(getPostsByUser);

// Routes for a single post by ID
router.route('/:id')
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

// --- FIX: CREATE A SEPARATE ROUTE FOR LIKING A POST ---
router.route('/:id/like').put(protect, likePost);

module.exports = router;
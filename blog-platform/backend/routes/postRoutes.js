const express = require('express');
const router = express.Router();
const { 
  getPosts, 
  createPost, 
  getPostById, 
  updatePost, 
  deletePost,
  getPostsByUser,
  likePost,
  getRecommendations // <-- 1. ADD THIS IMPORT
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

// --- 2. ADD THE NEW RECOMMENDATION ROUTE ---
router.route('/recommendations').get(protect, getRecommendations);

// --- Existing Routes ---
router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/user/:userId').get(getPostsByUser);

router.route('/:id')
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.route('/:id/like').put(protect, likePost);

module.exports = router;
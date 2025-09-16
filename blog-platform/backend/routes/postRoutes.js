const express = require('express');
const router = express.Router();
const { 
  getPosts, 
  createPost, 
  getPostById, 
  updatePost, 
  deletePost 
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

// --- Routes for the entire post collection ---
// GET /api/posts (Get all posts)
// POST /api/posts (Create a new post)
router.route('/')
  .get(getPosts)
  .post(protect, createPost);

// --- Routes for a single, specific post ---
// GET /api/posts/123 (Get post with ID 123)
// PUT /api/posts/123 (Update post with ID 123)
// DELETE /api/posts/123 (Delete post with ID 123)
router.route('/:id')
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
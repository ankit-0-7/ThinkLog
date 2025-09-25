const express = require('express');
const router = express.Router();
const { createComment, getCommentsForPost } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

// Route to create a new comment
// This is a protected route, only logged-in users can comment
router.post('/', protect, createComment);

// Route to get all comments for a specific post
router.get('/post/:postId', getCommentsForPost);

module.exports = router;
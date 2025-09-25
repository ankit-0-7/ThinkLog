const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

/**
 * @desc    Create a comment on a post
 * @route   POST /api/comments
 * @access  Private
 */
const createComment = async (req, res) => {
  try {
    // We get the text from the request body, and the post ID
    const { content, postId } = req.body;

    if (!content || !postId) {
      res.status(400);
      throw new Error('Content and Post ID are required');
    }

    // Create the new comment document
    const comment = await Comment.create({
      content,
      post: postId,
      user: req.user.id, // We get the logged-in user from the 'protect' middleware
    });

    // We want to return the new comment with the author's name
    const populatedComment = await Comment.findById(comment._id).populate('user', 'name');

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @desc    Get all comments for a single post
 * @route   GET /api/comments/post/:postId
 * @access  Public
 */
const getCommentsForPost = async (req, res) => {
  try {
    // Find all comments where the 'post' field matches the postId from the URL
    const comments = await Comment.find({ post: req.params.postId })
      .populate('user', 'name') // Replace the user ID with the user's name
      .sort({ createdAt: -1 }); // Show newest comments first

    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createComment,
  getCommentsForPost,
};
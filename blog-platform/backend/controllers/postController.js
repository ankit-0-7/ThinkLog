const Post = require('../models/postModel');

/**
 * @desc    Get all posts
 * @route   GET /api/posts
 * @access  Public
 */
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate('user', 'name'); 

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Get a single post by ID
 * @route   GET /api/posts/:id
 * @access  Public
 */
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Get posts by user ID
 * @route   GET /api/posts/user/:userId
 * @access  Public
 */
const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('user', 'name');
    
    // This log will appear in your backend terminal for debugging
    console.log(`Found ${posts.length} posts for user ${req.params.userId}`);

    res.status(200).json(posts);
  } catch (error){
    res.status(500).json({message: 'Server Error' });
  }
};

/**
 * @desc    Create a new post
 * @route   POST /api/posts
 * @access  Private
 */
const createPost = async (req, res) => {
  try {
    const { title, content, genre } = req.body;
    if (!title || !content || !genre) {
      res.status(400);
      throw new Error('Please add all fields');
    }
    const post = await Post.create({ title, content, genre, user: req.user.id });
    const populatedPost = await Post.findById(post._id).populate('user', 'name');
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

/**
 * @desc    Update a post
 * @route   PUT /api/posts/:id
 * @access  Private
 */
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('user', 'name');
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Delete a post
 * @route   DELETE /api/posts/:id
 * @access  Private
 */
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    await post.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Like or unlike a post
 * @route   PUT /api/posts/:id/like
 * @access  Private
 */
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (!post.likes) {
      post.likes = [];
    }
    const userIndex = post.likes.findIndex((id) => id.toString() === req.user.id);
    if (userIndex === -1) {
      post.likes.push(req.user.id);
    } else {
      post.likes.splice(userIndex, 1);
    }
    await post.save();
    const populatedPost = await Post.findById(post._id).populate('user', 'name');
    res.status(200).json(populatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getPosts, getPostById, getPostsByUser, createPost, updatePost, deletePost, likePost,
};
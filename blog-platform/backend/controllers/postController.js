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
      .populate('user', 'name')
      .populate('commentCount'); 

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
/**
 * @desc    Search for posts
 * @route   GET /api/posts/search?q=query
 * @access  Public
 */
const searchPosts = async (req, res) => {
  try {
    const searchQuery = req.query.q;

    if (!searchQuery) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const posts = await Post.find(
      { $text: { $search: searchQuery } },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } })
    .populate('user', 'name');

    res.status(200).json(posts);
  } catch (error) {
    // This will ensure the error is always printed to your terminal
    console.error('--- SEARCH ERROR ---', error); 
    res.status(500).json({ message: 'Server Error' });
  }

};

/**
 * @desc    Get post recommendations for a user
 * @route   GET /api/posts/recommendations
 * @access  Private
 */
const getRecommendations = async (req, res) => {
  try {
    console.log(`\n--- [DEBUG] Starting Recommendations for user: ${req.user.id} ---`);

    const likedPosts = await Post.find({ likes: req.user.id }).select('genre _id');
    console.log(`[DEBUG] Step 1: Found ${likedPosts.length} liked posts.`);
    
    if (likedPosts.length === 0) {
  console.log('[DEBUG] User has no liked posts. Returning empty array.');
  return res.json([]); // <-- This is the only change needed
}

    const genreCounts = {};
    likedPosts.forEach(post => {
      genreCounts[post.genre] = (genreCounts[post.genre] || 0) + 1;
    });
    console.log('[DEBUG] Step 2: Counted genres:', genreCounts);

    const qualifiedGenres = Object.keys(genreCounts).filter(
      (genre) => genreCounts[genre] >= 2
    );
    console.log('[DEBUG] Step 3: Qualified genres (>= 2 likes):', qualifiedGenres);

    if (qualifiedGenres.length === 0) {
      console.log('[DEBUG] No genres met the threshold. Returning recent posts as fallback.');
      const recentPosts = await Post.find({
        _id: { $nin: likedPosts.map(p => p._id) },
        user: { $ne: req.user.id }
      }).sort({ createdAt: -1 }).limit(10).populate('user', 'name');
      return res.json(recentPosts);
    }

    const likedPostIds = likedPosts.map(p => p._id);
    const recommendationQuery = {
      genre: { $in: qualifiedGenres },
      _id: { $nin: likedPostIds },
      user: { $ne: req.user.id }
    };
    console.log('[DEBUG] Step 4: Using this query to find posts:', JSON.stringify(recommendationQuery));

    const recommendations = await Post.find(recommendationQuery)
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name');
    console.log(`[DEBUG] Step 5: Found ${recommendations.length} final recommendations.`);
    console.log('--- [DEBUG] End of Recommendations ---');
    
    res.status(200).json(recommendations);

  } catch (error) {
    console.error('--- [ERROR] in getRecommendations: ---', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getPosts,
  getPostById,
  getPostsByUser,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getRecommendations,
  searchPosts,
};
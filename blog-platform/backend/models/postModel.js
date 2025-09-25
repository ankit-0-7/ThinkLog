const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
  },
  genre: {
    type: String,
    required: [true, 'Please add a genre'],
    enum: ['Tech', 'Lifestyle', 'Health', 'Travel', 'Finance' , 'Education'],
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    default: [],
  },
  
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
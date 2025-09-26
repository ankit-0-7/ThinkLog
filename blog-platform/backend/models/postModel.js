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
  
}, { timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
 });
 postSchema.virtual('commentCount', {
  ref: 'Comment',       // The model to use for counting
  localField: '_id',      // Find comments where our local _id
  foreignField: 'post', // is in their 'post' field
  count: true           // And just return the count, not the documents
});


module.exports = mongoose.model('Post', postSchema);
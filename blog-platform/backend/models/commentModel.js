const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    // A reference to the Post this commenr belongs to
    post:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Post',//This tells Mongoose the ID refers to a document in the 'Post' collection
    },
    // A reference to the User who wrote the comment
    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'User', //This tells Mongoose the ID referes to a document in the 'User' collection
    },
},
{
    timestamps:true,
}
);
module.exports=mongoose.model('Comment',commentSchema);
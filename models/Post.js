const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    image:{
        type:String,
        required:true
    },
    caption:{
        type:String
    },
    likes:[{
        type:Schema.Types.ObjectId,
        ref:'user'
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Post',postSchema);
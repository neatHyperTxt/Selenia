const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        default:''
    },
    followers:[{
        type:Schema.Types.ObjectId,
        ref:'User',
        default:[]
    }],
    following:[{
        type:Schema.Types.ObjectId,
        ref:'User',
        default:[]
    }],
    posts:[{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }],
    profileImage:{
        type:String,
        default:'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }, 
})

module.exports = mongoose.model('User',UserSchema);
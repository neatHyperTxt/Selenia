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
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User',UserSchema);
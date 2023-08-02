import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
    userId :{
        type : String ,   
        required:true
    }
    ,
    firstName : {
        type : String, 
        required : [true,'Please provide name'],
        minlength : 2,
        maxlength : 50,
    },
    lastName : {
        type : String, 
        required : [true,'Please provide name'],
        minlength : 2,
        maxlength : 50,
    },
    location :{
        type : String,
    },
    description : String,
    userPicturePath: String,
    picturePath : {
        type: String,
        default : ""
    },
    likes : {
        type : Map,
        of : Boolean,
    },
    comments:{
        type : Array,
        default : [ ]
    }
},{timestamps:true})

const Posts = mongoose.model('Posts',PostSchema)
export default Posts
import mongoose from "mongoose";


const ChatSchema = new mongoose.Schema({
    sender :{
        type : String ,   
        required:true
    }
    ,
    reciever :{
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    }

},{timestamps:true})

const Chats = mongoose.model('Chats',ChatSchema)
export default Chats
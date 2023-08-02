import mongoose from "mongoose";
import dotenv from "dotenv"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

dotenv.config()

const UserSchema = new mongoose.Schema({

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
    }
    ,
    email : {
        type : String,
        required : [true,'Please provide email'],
        match : [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"please provide valid email"],
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        immutable:true
    },
    picturePath :{
        type : String,
        default : ""
    },
    friends : {
        type : Array,
        default : []
    },
    location : {
        type : String
    }
    ,
    occupation : String,
    viewedProfile : Number,
    impressions : Number
},{timestamps:true}
)

//using mongoose middlewares


//monoose instance methods for schema
UserSchema.methods.createJWT = function () {
    return jwt.sign({userId : this._id,firstName : this.firstName},process.env.JWT_SECRET,{expiresIn : process.env.JWT_LIFE})
}

UserSchema.methods.comparePassword = async function(userPassword){
    const isMatch =  await bcrypt.compare(userPassword,this.password)
    console.log(isMatch)
    return isMatch
}
const User = mongoose.model('User',UserSchema)
export default User
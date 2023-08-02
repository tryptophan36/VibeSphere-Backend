import User from '../models/User.js'
import bcrypt from 'bcrypt'
const register = async (req,res) =>{
    try {
        const {
            firstName,lastName,
            email,password,
            picture,
            location,
            occupation,viewedProfile,
            impressions
        } = req.body
        
        let filePath= req.file.path||picturePath
        if(filePath.includes("\\")){
        let newArr = filePath.split('\\')
             filePath = newArr[newArr.length-1]
        }
        // console.log(filePath)
        let salt = await bcrypt.genSalt(10)
        let hashedPass= await bcrypt.hash(password,salt)
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPass,
            picturePath: filePath,
            friends:[],
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()*10000) ,
            impressions: Math.floor(Math.random()*10000)
        });
        const savedUser =await newUser.save()
        res.status(201).json({savedUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error})
    }
}

const login = async (req,res)=>{
   try {
    const {email,password}=req.body
    if(!email||!password){
        res.status(400).json({msg:"please provide mail and password"})
    }
    const user= await User.findOne({email:email});
    
    if(!user){
        res.status(400).json({msg:"Invalid credentials"})
    }
    const isPasswordOk =  await bcrypt.compare(req.body.password,user.password)

    if(isPasswordOk){
        const token =  user.createJWT()
    res.status(200).json({user,token})
    }
    else
    {
        res.status(400).json({msg:"invalid credentials"})
    }
   } catch (error) {
    console.log(error) 
    res.status(500).json({msg:error})
   }

} 
export {register,login};
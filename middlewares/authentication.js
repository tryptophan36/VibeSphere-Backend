 import jwt from 'jsonwebtoken'
 import User from '../models/User.js' 
 const authentication = async (req,res,next)=>{
      const authHeader = req.headers.authorization
      if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(400).json({msg:"please provide a valid token"})
      }
      const token= authHeader.split(' ')[1]
      try {
        const payload=jwt.verify(token,process.env.JWT_SECRET)
        if(!payload){
          res.status(500).json({msg:"invalid token"})
        }
        req.user = {userId:payload.userId,firstName:payload.firstName}
        next()
      } catch (error) {
        console.log(error)
        res.status(500).json({error})
      }
 }
 export default authentication
import Posts from "../models/posts.js"
import User from "../models/User.js"
const addPost = async (req,res) =>{
   try {
      
    const {
        userId,
        picturePath,
        description,
     }= req.body
     const user = await User.findOne({_id:userId})
     if(!user){
        res.status(404).json({msg:"user not found"})
     }
     let filePath= req.file.path||picturePath
     if(filePath.includes("\\")){
     let newArr = filePath.split('\\')
          filePath = newArr[newArr.length-1]
     }

     const post = await Posts.create({
      userId,
      firstName :user.firstName
      ,lastName :user.lastName,
      location : user.location,
      description,
      userPicturePath : user.picturePath,
      picturePath:filePath,
      likes : {}
     })
     await post.save()
     //we are returning the new posts of updated arrays so that frontend can update it right away
     const newPosts = await Posts.find({userId})
     res.status(201).json({newPosts})
   } catch (error) {
    console.log(error)  
    res.status(500).json({msg:error.message})
   }
}
const getAllFeeds = async (req,res)=>{
   try {
      let posts = await Posts.find({}).sort({date:1})
      res.status(200).json({posts})
   } catch (error) {
      console.log(error)
      res.status(500).json({error:error.message})
   }
}
const getUserFeed = async (req,res)=>{
  try {
   const id = req.params.id
  const posts = await Posts.find({userId:id})
  if(!posts){
   res.status(404).json({msg:"No posts found"})
  }
  res.status(200).json({posts})
  } catch (error) {
   console.log(error)
   res.status(500).json({error:error.message})
  }
}

//Update Likes and Comments
const addRemoveLikes = async (req,res)=>{
   try {
      //post Id
      const {id} = req.params;
      //Id of the user who is liking
      const userId= req.user.userId;
      const post = await Posts.findOne({_id:id})
      if(!post){
         res.status(404).json("404 not found")
      }
      const liked = post.likes.has(userId)
      if(liked){
           post.likes.delete(userId)
      }
      else 
      {
         post.likes.set(userId,true)
      }
      const updatedPost = await Posts.findByIdAndUpdate(id,{likes:post.likes},{new:true})
      res.status(200).json({data :updatedPost})

   } catch (error) {
      console.log(req.user)
      
      res.status(500).json({err: error.message})
   }
}
const addComment = ()=>{

}
export {addPost,getAllFeeds,getUserFeed,addRemoveLikes,addComment};
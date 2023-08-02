import User from '../models/User.js'

const getUser = async (req,res)=>{
   try {
    const userId = req.params.id;
    if(!userId)
    {
        res.status(400).json({msg:"Invalid User"})
    }
    const user = await User.findOne({_id:userId})
    if(!user)
    {
        res.status(400).json({msg:"Invalid User"})
    }
    
    res.status(200).json({user})
   } catch (error) {
    console.log( error)
    res.status(200).json({msg:error})
   }
}

const getUserFriends = async (req,res) =>{
   try {
    const {id} = req.params;
   const user = await User.findOne({_id:id})
   
   if(user.friends){
    const friends = await Promise.all(
      user.friends.map(async (id)=>{
        
          const friendUser= User.findOne({_id:id})
          if(friendUser)
          return friendUser
      })
     )
   
   
   const formattedFriends = friends.map(({_id,firstName,lastName,location,occupation,picturePath})=>{
    return {_id,firstName,lastName,location,occupation,picturePath}
   } )
   res.status(200).json({formattedFriends})
  }
  else res.status(200).json({})
   } catch (error) {
    console.log( error)
    res.status(200).json({msg:error})
   }
}

const addFriend = async (req,res)=>{
      try {
        const {id,friendId}= req.params
         const user=await User.findOne({_id:id})
         const friend = await User.findOne({_id:friendId})
         if(!user || !friend){
          res.status(404).json({error:"user not found"})
         }
         //removing friends from both sides
         else if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id)=>{return id!==friendId});
            friend.friends = friend.friends.filter((id)=>id!==id);
         }
         //adding friends to both sides
         else{
           user.friends.push(friendId)
           friend.friends.push(id)
         }
        await user.save()
        await friend.save()
        const allFriends = await Promise.all(
            user.friends.map((id)=>{
                return User.findOne({_id:id})
            })
            )
            const formattedFriends = allFriends.map(({_id,firstName,lastName,location,occupation,picturePath})=>{
                return {_id,firstName,lastName,location,occupation,picturePath}
               } )
         res.status(200).json({user,formattedFriends})
      } catch (error) {
        console.log(error)
        res.status(500).json({error})
      }
}

export {getUser,getUserFriends,addFriend}

import express from 'express'
import authentication from '../middlewares/authentication.js'
import {
    getUser,
    getUserFriends,
    addFriend
} from '../controllers/user.js'

const router =express.Router()

router.get('/:id',authentication,getUser)
router.get('/:id/friends',authentication,getUserFriends)

//UPDATE//
router.patch("/addFriend/:id/:friendId",authentication,addFriend)

export default router
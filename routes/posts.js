import express from 'express'
import authentication from '../middlewares/authentication.js'
import {upload} from '../file-upload.js'
import {addPost,getAllFeeds,getUserFeed,addRemoveLikes,addComment} from '../controllers/posts.js'
const router = express.Router()

//post
router.post('/add',authentication,upload.single('picture'),addPost)

//read//
router.get("/getAllFeeds",authentication,getAllFeeds)
router.get("/getUserFeed/:id",authentication,getUserFeed)

//update
router.patch("/like/:id",authentication,addRemoveLikes)
//router.patch("/comment",authentication,addComment)

export default router
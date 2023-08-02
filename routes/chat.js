import express from 'express'
const router = express.Router()
import authentication from '../middlewares/authentication.js'
import {addMessage,getMessage } from '../controllers/chat.js'

router.get('/getMessage/:sender/:reciever',authentication,getMessage)
router.post('/addMessage',authentication,addMessage)


export default router
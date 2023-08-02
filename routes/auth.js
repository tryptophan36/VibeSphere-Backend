import express from "express";
import {Router} from 'express'
import  {upload}  from "../file-upload.js";
import { register,login } from "../controllers/auth.js";

const router = Router()

router.post('/register',upload.single('picture'),register)
router.post('/login',login)
export default router;
import express from 'express'
import multer from 'multer'

const  storage =  multer.diskStorage(
    {
        destination: (req,file,cb)=>{
            cb(null,'public/assets')
        },
        filename: (req,file,cb)=>{
           cb(null,file.originalname)
        }
    }
)
export const upload = multer({storage})//creating instance of upload
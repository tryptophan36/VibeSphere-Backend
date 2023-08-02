import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import {fileURLToPath} from 'url'
import {Server} from 'socket.io'
import {METHODS, createServer} from 'http'
//ROUTERS
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import postRouter from './routes/posts.js'
import chatRouter from './routes/chat.js'
import { register } from './controllers/auth.js'

//configurations
dotenv.config()
 const __filename = fileURLToPath(import.meta.url) //to grab file name
const __dirname = path.dirname(__filename)
const app = express()
//middlewares
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"));;
app.use(bodyParser.json({limit:"30mb",extended : true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')))

//setting up socket.io connection
const server = createServer(app);
 const io= new Server(server,{
    cors : {
        origin:"http://localhost:5173",
        methods: ["GET","POST"],
        credentials:true
    }
})
global.onlineUsers = new Map();
io.on("connection",(socket)=>{
    global.chatSocket = socket;
    console.log(onlineUsers)
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    })
    socket.on('send-message',(message,sender,reciever,date)=>{
       const sendUserSocket = onlineUsers.get(reciever)
        socket.to(sendUserSocket).emit("recieve-message",message,sender,reciever,date)
        console.log(sendUserSocket)

    })

    socket.on("disconnect",()=>{
        console.log("User Disconected",socket.id)
    })
})

//ROUTES//
app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/post',postRouter)
app.use('/chat',chatRouter)

//CONNECT TO DB
const PORT= process.env.PORT||6001
const Connect = async ()=>{
   try {
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser :true,
        useUnifiedTopology :true
    })
    server.listen(PORT,()=>{
        console.log("Server listening on port "+PORT)
    })
    //injecting data manually
   //await User.insertMany(users);
   //await Posts.insertMany(posts);
   } catch (error) {
    console.log(error.message)
   }
}
Connect()
export {server,io};

//server listening


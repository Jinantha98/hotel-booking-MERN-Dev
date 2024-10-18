import bodyParser from 'body-parser'
import express from 'express'
import userRouter from './routes/usersRoute.js'
import mongoose from 'mongoose'
import galleryItemRouter from './routes/galleryItemRoute.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
const app = express();

app.use(bodyParser.json());

const connectionString = "mongodb+srv://tester:123@cluster0.k5q9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if(token != null){
        jwt.verify(token,"secret",(err,decoded)=>{
            if(decoded != null){
                req.user = decoded
                next()
             
            }
        }
    )

    }else{
        next()
    }

});

mongoose.connect(connectionString).then(
    ()=>{
        console.log("connected to the database")
    }
).catch(
    ()=>{
        console.log("connaction failed")
    }
)

app.use("/api/user",userRouter)
app.use("/api/gallery",galleryItemRouter)




app.listen(5000,(req,res)=>{
    console.log("server is running on port 5000")
});

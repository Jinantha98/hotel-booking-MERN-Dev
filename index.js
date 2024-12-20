import bodyParser from 'body-parser'
import express from 'express'
import userRouter from './routes/usersRoute.js'
import mongoose from 'mongoose'
import galleryItemRouter from './routes/galleryItemRoute.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import categoryRouter from './routes/categoryRoute.js'
import roomRouter from './routes/roomRoute.js'
import bookingRouter from './routes/bookingRoute.js'







dotenv.config();
const app = express();

app.use(bodyParser.json());

const connectionString = process.env.MONGO_URL;

app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if(token != null){
        jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
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
app.use("/api/category",categoryRouter)
app.use("/api/room",roomRouter)
app.use("/api/bookings",bookingRouter)





app.listen(5000,(req,res)=>{
    console.log("server is running on port 5000")
});

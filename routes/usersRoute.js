import express from 'express'
import { getuser, loginUser, postUser } 
from '../controllers/usercontrollers.js';

const userRouter = express.Router();



userRouter.post("/",postUser);
userRouter.get("/",getuser);
userRouter.post("/login",loginUser);



export default userRouter;
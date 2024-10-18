
import User from "../models/User.js"   
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'


dotenv.config();
export function postUser(req,res){
    
    const user = req.body

    const password = req.body.password

    const passwordHash = bcrypt.hashSync(password,10);

    user.password = passwordHash
   
    const newUser = new User(user)
    newUser.save().then(

        ()=>{
            res.json({
                message : "user created successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "user creation failed"
            })
        }
    )

  
}


export function loginUser(req,res){
    const credentials =req.body

    User.findOne({email :credentials.email }).then(
        (user)=>{

          if(user ==null){

            res.status(403).json({
              message : "user not found"
                })
            
            }else{
               const isPasswordValid =  bcrypt.compareSync(
                credentials.password, user.password);

            if (!isPasswordValid){res.status(403).json({
                message : 'Incorrect password'
            });
            }else{
                const payload = {
                    id : user._id,
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    type :user.type
                };
                const token = jwt.sign(payload, JWT_KEY, {expiresIn: "48h"});


                res.json({
                message : "Welcome",
                    user : user,
                    token : token

                })
            }
            }
           
        }
    )
}
export function getuser(req, res) {
    User.find()
        .then((list) => {
            res.json({ list });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Failed to retrieve users", error });
        });
}
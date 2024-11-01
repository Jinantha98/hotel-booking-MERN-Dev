import Booking from "../models/booking.js";
import { isCustomerValid } from "./usercontrollers.js";

export function createBooking (req,res){

    if(isCustomerValid(req)){
        res.status(403).json({
            message : "Customer not found"
        })
        return
    }
    
    const satrtingId = 1200;

    Booking.countDocuments({}).then(
        (count)=>{
            console.log(count);
            const newId = satrtingId + count + 1;
            const newBooking = new Booking({
                bookingId : newId,
                roomId : req.body.roomId,
                email : req.user.email,
                start : req.body.start,
                end : req.body.end

            })
            newBooking.save().then(
                (result)=>{
                    res.json(
                        {
                            message : "Booking created successfully",
                            result : result
                        }
                    )
                }
            ).catch(
                (err)=>{
                    res.json(
                        {
                            message : "Booking creation faild",
                            error : err
                        }
                    )
                }
            ).catch(
                (err)=>{
                    res.json(
                        {
                            message : "Booking creation faild",
                            error : err
                        }
                    )
                }
            )

        }
    )
}
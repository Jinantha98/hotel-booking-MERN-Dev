import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
      bookingId : {
        type : Number,
        required : true,
        unique : true
      },
      roomId :{
        type : Number,
        required : true
      },
    
    email :{
      type : Stringr,
      required : true
    },
    
    status :{
      type : String,
      required : true,
      default : "Pending"
    },
    
    reason:{
      type : String,
      default : " "
    },
    
    start :{
      type : Date,
      required : true
    },
    
    end :{
      type : Date,
      required : true
    },

    status :{
        type : String,
        default : "Pending"
      },
      

    }
)
const Booking = mongoose.model("Booking",bookingSchema)

export default Booking;
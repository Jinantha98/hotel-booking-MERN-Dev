import mongoose from "mongoose";
import Category from "./category";

const roomSchema = new mongoose.Schema({

    roomId : {
        type :Number,
        required :true,
        unique :true
    },
    Category : {
        type : String,
        required : true
    },
    maxGuests : {
        type :Number,
        required : true,
        default : 3
    },
    available : {
        type : Boolean,
        required : true,
        default : true
    },
    photos :  {
        type : String
    },
    specialDescription : {
        type :String,
        default : ""
    },
    notes: {
        type :String,
        default : ""
    }
}

)

const room = mongoose.model("Rooms",roomSchema)

export default room;
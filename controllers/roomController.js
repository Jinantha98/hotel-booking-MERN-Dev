import room from "../models/room.js";
import { isAdminValid } from "./usercontrollers.js";   

// Create Room
export function createRoom(req,res){
    
    if(!isAdminValid(req)){
        res.status(403).json({
            message : "Unauthorized"
        })
        return

    }

    const newRoom = new room(req.body)
    newRoom.save().then(
        (result)=>{
            res.json(
                {
                    message : "Room created successfully",
                    result : result
                }
            )
        }
    ).catch(
        (err)=>{
            res.json(
                {
                    message : "Room creation faild",
                    error : err
                }
            )
        }
    )
}

// Delete room

export function deleteRoom(req, res) {
    
    if (!isAdminValid(req)) {
        res.status(403).json({
            message: "Unauthorized"
        })
        return
    }

    
    const { roomId } = req.params;

    if (!roomId) {
        return res.status(400).json({
            message: "Room ID is required."
        });
    }

    room.findOneAndDelete({roomId:roomId})
        .then((result) => {
            if (!result) {
                return res.status(404).json({
                    message: `Room with ID '${id}' not found.`
                });
            }
            res.json({
                message: "Room deleted successfully.",
                result: result
            });
        })
        .catch((err) => {
            console.error("Error deleting room:", err);
            res.status(500).json({
                message: "Room deletion failed.",
                error: err
            });
        });
}

// Find room by ID

export function findRoomById(req,res){

    const roomId = req.params.roomId

    room.findOne({roomId : roomId}).then(
        (result)=>{

            if(result == null){
                res.status(404).json({
                    message : "room not found"
                })
                return
                
            }else{
                res.json(
                    {
                        message :"room found",
                        result : result
                    }
                )
            }
        }
    ).catch (
        (err)=>{
            res.json(
                {
                    message : "room search faild",
                    eroor : err
                }
            )
        }
    )
}

export function getrooms(req, res) {
    room.find()
        .then(
            (result)=>{
                res.json(
                    {
                        rooms : result
                    }
                )
            }
        )
        .catch(
            () => {
            
            res.json({ 
                message: "Failed to get rooms"
            });
        });
}

// room update

export function updateRoom(req,res){

    if (!isAdminValid(req)) {
        res.status(403).json({
            message: "Unauthorized"
        })
        return 
    }

    const roomId = req.params.roomId

    room.findOneAndUpdate({
        roomId:roomId
    },req.body).then(
        ()=>{
            res.json(
                {
                    message : "Room updated successfully"
                }
            )
        }
    ).catch(
        ()=>{
            res.json(
                {
                    message :"Room Update failed"
                }
            )
        }
    )

}

//Get roomById

export function getRoomsByCategory(req,res){
    const category =req.params.category

    room.find({category:category}).then(
        (result)=>{
            res.json(
                {
                    rooms : result
                }
            )
        }
    ).catch(
        ()=>{
            res.json(
                {
                    message : "Failed to get rooms"
                }
            )
        }
    )


}
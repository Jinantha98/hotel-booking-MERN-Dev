
import GalleryItem from "../models/galleryItem.js"


export function createGalleryItem(req,res){
    const user =req.user
    if (user ==null){
        res.status(403).json({
            message : "please login to create a gallery item"
        })
        return
    }
    if (user?.type != "admin"){
        res.status(403).json({
            message : "You do not have permission to create a gallery item"
        })
        return
    }
    if (user.type != 'admin'){
        res.status(403).json({
            message : "You are not Authorized to create a gallery item"
        })
        return
    }

    
    const galleryItem = req.body.item

    const newGalleryItem = new GalleryItem(galleryItem)
    newGalleryItem.save().then(
        ()=>{
            res.json({
                message : "Gallery item created succesfully"
            })
        }
    ).catch(
        ()=>{
            res.status(500).jason({
                message : "Gallery item creation failed"
            })

        }
    )
}
export function getGalleryItem(req,res){
    GalleryItem.find().then(
        (list)=>{
            res.json({
                list : list
            })
        }
    )
}

import Category from "../models/category.js";

// Create a new category
export function createCategory(req,res){

    if (req.user == null){
        res.status(401).json({
            message : "Unauthorized"
        })
        return
    }
    if (req.user.type != "admin"){
        res.status(403).json({
            message : "Forbidden"
        })
        return
    }

    const newCategory = new Category(req.body)
    newCategory.save().then(
        (result)=>{
            res.json(
                {
                    message : "Category created sucessfully"
                }
            )
        }
    ).catch(
        (err)=>{
            res.json(
                {
                    message : "Category creation failed"
                }
            )
        }
    )

}

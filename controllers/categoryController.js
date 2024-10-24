import Category from "../models/category.js";
import { isAdminValid } from "./usercontrollers.js";

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
                    message : "Category created sucessfully",
                    result :result
                }
            )
        }
    ).catch(
        (err)=>{
            res.json(
                {
                    message : "Category creation failed",
                    err : err
                }
            )
        }
    )

}

//get Category

export function getCategory(req, res) {
    Category.find()
        .then((list) => {
            res.json({ list });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Failed to retrieve categories", error });
        });
}

// get category byName

export function getCategoryByName(req,res){
    const name = req.params.name;
    Category.findOne({name : name})
    .then(
        (result)=>{

    if(result == null){
        req.jason(
            {
                message : "Category not found"
            }
        )
    }else{
        res.json(
            {
                Category :result
            }
        )
    }
        }
    ).catch(
        ()=>{
            res.json(
                {
                    message : "failed to get categoty"
                }
            )
        }
    )

}


// delete catogery 
export function deleteCategory(req, res) {

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    
    if (req.user.type !== "admin") {
        return res.status(403).json({
            message: "Access denied. Only admins can delete categories."
        });
    }

    const { name } = req.params;

    // Delete the category by name
    Category.findOneAndDelete({ name })
        .then((deletedCategory) => {
            if (!deletedCategory) {
                return res.status(404).json({ message: `Category '${name}' not found.` });
            }
            res.json({ message: "Category deleted successfully." });
        })
        .catch((error) => {
            console.error("Error deleting category:", error);
            res.status(500).json({ message: "Failed to delete category", error });
        });
}

// Update Category

export function updateCategory(req,res){

    if(!isAdminValid(req)){
        res.status(403).json({
            message : "Unauthorized"
        })
        return

    }
    
    const name = req.params.name;
    Category.updateOne({name : name},req.body).then(
        ()=>{
            res.json({
                message :"Category updated successfully."
            })
        }).catch(
            ()=>{
            res.json({
                message : "Failed to update category"
            })
            }
        )
}

/* export function updateCategory(req, res) {
  
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    
    if (req.user.type !== "admin") {
        return res.status(403).json({
            message: "Access denied. Only admins can update categories.",
        });
    }

    const { name } = req.params; 
    const updateData = req.body; 


    Category.findOneAndUpdate({ name }, updateData, { new: true, runValidators: true })
        .then((updatedCategory) => {
            if (!updatedCategory) {
                return res.status(404).json({ message: `Category '${name}' not found.` });
            }
            res.json({
                message: "Category updated successfully.",
                updatedCategory,
            });
        })
        .catch((error) => {
            console.error("Error updating category:", error);
            res.status(500).json({ message: "Failed to update category", error });
        });
}
*/
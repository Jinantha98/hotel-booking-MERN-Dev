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

// get category 

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

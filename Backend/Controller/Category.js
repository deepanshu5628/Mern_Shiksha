const Category=require("../Models/Category");
exports.createCategory=async(req,res)=>{
   try {
     // fetch data form requrest 
     let {name,description}=req.body;
     // perform validation
     if(!name||!description){
         return res.status(400).json({
             success:false,
             message:"fill in all the details",
         });
     };
     // create a category
     let createdCategory=await Category.create({
         name:name,
         description:description,
     })
     // return responce
     res.status(200).json({
         success:true,
         message:"Category has been created Successfully",
         createdCategory,
     })
   } catch (error) {
    return res.status(400).json({
        success:false,
        message:"error in createcatoegoty  controller",
        data:error,
    })
   }
}

// show alll Category controller
exports.showAllCategory=async(req,res)=>{
    try {
        let allcategory=await Category.find({});
        // return responce
        res.status(200).json({
            success:true,
            message:"all Category's are -",
            allcategory,
    })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in show all category controller",
            data:error,
        })
    }
    
}
const Category=require("../Models/Category");
const Course=require("../Models/Course");
// --------------------------------------Create Category-------------------------------------------------------
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

// --------------------------------------show all Category-------------------------------------------------------
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

// --------------------------------------show a specific Category-------------------------------------------------------
exports.categoryPageDetails=async(req,res)=>{
    try {
        // fetch cateory id form req body 
        let{categoryId}=req.body;
        // basic validation
        if(!categoryId){
            return res.status(400).json({
                success:false,
                message:"fill in all the details",
            });
        }
        // check if the cateogory id is valid or not 
        let categorydetails=await Category.findById(categoryId);
        if(!categorydetails){
            return res.status(400).json({
                success:false,
                message:"Category is not valid ",
            });
        }
        // find all the courses of the given cateogy 
        let selectedcatergorycourses=await Course.find({category:categoryId})
        .populate("ratingAndReviews").exec();

        // find other courses other than this caterogy 
        let othercategorycourses=await Course.find({category:{$ne:categoryId}});

        // most selled course H.W
        res.status(200).json({
            success:true,
            message:"all details are ",
            // categorydetails,
            selectedcatergorycourses,
            othercategorycourses,
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in category page detail  controller",
            data:error.message,
        });
    }
}
const Category=require("../Models/Category");
const Course=require("../Models/Course");
// --------------------------------------Create Category-------------------------------------------------------
exports.createCategory=async(req,res)=>{
    try {
        // fetch data form requrest 
        let {name,description,link}=req.body;
        // perform validation
        if(!name||!description||!link){
            return res.status(400).json({
                success:false,
                message:"fill in all the details",
            });
        };
        // create a category
        let createdCategory=await Category.create({
            name:name,
            description:description,
            link:link,
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
        let{link}=req.body;
        // basic validation
        if(!link){
            return res.status(400).json({
                success:false,
                message:"fill in all the details",
            });
        }
        // check if the cateogory id is valid or not 
        let categorydetails=await Category.findOne({link:link});
        if(!categorydetails){
            return res.status(400).json({
                success:false,
                message:"Category is not valid ",
            });
        }
        let categoryId=categorydetails._id;        
        // console.log(categoryId)
        // find all the courses of the given cateogy 
        let selectedcatergorycourses=await Course.find({$and:[{category:categoryId},{status:"Published"}]})
        // .populate("ratingAndReviews").exec();

        // find other courses other than this caterogy 
        let othercategorycourses=await Course.find({$and:[{category:{$ne:categoryId}},{status:"Published"}]});

        // most selled course H.W
        res.status(200).json({
            success:true,
            message:"all details are ",
            categorydetails,
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
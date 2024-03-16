const mongoose=require("mongoose");
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        require:true,
    },
    course:[{
        type:mongoose.Types.ObjectId,
        ref:"Course",
    }]
})

const Category=mongoose.model("Category",categorySchema);
module.exports=Category;
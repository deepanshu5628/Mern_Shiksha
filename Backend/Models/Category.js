const mongoose=require("mongoose");
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        require,
    },
    description:{
        type:String,
        require,
    },
    course:[{
        type:mongoose.Types.ObjectId,
        ref:"Course",
    }]
})

const Category=mongoose.model("Category",categorySchema);
module.exports=Category;
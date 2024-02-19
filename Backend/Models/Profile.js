const mongoose=require("mongoose");
const profileSchmea=new mongoose.Schema({
    gender:{
        type:String,
        enum:["Male","Female","Others"],
    },
    dob:{
        type:Date,
    },
    about:{
        type:String,
        trim:true,
    },
    contactNo:{
        type:Number,
        trim:true,
    }
})

const Profile=mongoose.model("Profile",profileSchmea);
module.exports=Profile;
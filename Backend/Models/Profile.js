const mongoose=require("mongoose");
const profileSchmea=new mongoose.Schema({
    gender:{
        type:String,
        default:null,
        enum:["Male","Female","Others"],
        required:true,
    },
    dob:{
        type:String,
        default:null,
        required:true,
    },
    about:{
        type:String,
        default:null,
        trim:true,
        required:true,
    },
    contactNo:{
        type:Number,
        default:null,
        trim:true,
        required:true,
    }
})

const Profile=mongoose.model("Profile",profileSchmea);
module.exports=Profile;
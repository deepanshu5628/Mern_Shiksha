const mongoose=require("mongoose");
const profileSchmea=new mongoose.Schema({
    gender:{
        type:String,
        default:null,
        enum:["Male","Female","Others"],
        require,
    },
    dob:{
        type:Date,
        default:null,
        require,
    },
    about:{
        type:String,
        default:null,
        trim:true,
        require,
    },
    contactNo:{
        type:Number,
        default:null,
        trim:true,
        require,
    }
})

const Profile=mongoose.model("Profile",profileSchmea);
module.exports=Profile;
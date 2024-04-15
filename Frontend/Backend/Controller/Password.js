const User=require("../Models/User");
const bcrypt=require("bcrypt");
const mailsender=require("../Utils/mailsender");
// ---------------------------------------------change password--------------------
exports.changePassword=async(req,res)=>{
    console.log("requriest recived");
    try {
        // fetch passs and newppas
        let {password,confirmpassword}=req.body;
        // fetch payload
        let payload=req.user;
        // perform validation
        if(!payload){
            return res.status(400).json({
                success:false,
                message:"User must be loged in to change the password",
            });
        }
        // match password's
        if(password!==confirmpassword){
            return res.status(400).json({
                success:false,
                message:"password and confirm password should be the same",
            });
        }
        // hash the pwd
        let hashedpassword=await bcrypt.hash(password,10);
        // update the password in the db 
        let userdetails=await User.findOneAndUpdate({
            email:payload.email,
        },{
            password:hashedpassword,
        },{
            new:true
        });
        // send respocne 
        res.status(200).json({
            success:true,
            message:"password has been updated successfully",
        });

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in changepassword controller",
            data:error.message
        });   
    }
}
// ---------------------------------------reset password token---------------------------
exports.resetPasswordtoken=async(req,res)=>{
    try {
        // fetch email from the req body 
        let {email}=req.body;
        // perform basic validation
        if(!email){
            return res.status(400).json({
                success:false,
                message:"fill all the dtails ",
            });
        }
        // check if any user exist with this mail id or not 
        let userdetails=await User.findOne({email});
        if(!userdetails){
            return res.status(400).json({
                success:false,
                message:"No User Found!",
            });
        }
        // generate a token
        let token=crypto.randomUUID();
        // create a link 
        let url=`https://shiksha-taupe.vercel.app/update-password/${token}`;
        // send this link via mail to the mail address
        let info;
        try {
             info=await mailsender(email,"password resetlink",url);
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"Error has occured while send the mail ",
                data:error,
            });
        }
        // update this token in the current user db

        let result=await User.findOneAndUpdate({email},{resetToken:token,resetTokenTimer:Date.now()+5*60*1000});
        res.status(200).json({
            success:true,
            message:"reset link has been sended to mail address",
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in resetpassword token controller",
            data:error.message
        });   
    }
}
// -----------------------------------resset password---------------------------------------
exports.resetPassword=async(req,res)=>{
    try {
        // fetch token pass confirmpass form req.body
        let {token,password,confirmPassword}=req.body;
        // perform basic validation
        if(!token||!password||!confirmPassword){
            return res.status(400).json({
                success:false,
                message:"fill all the dtails ",
            });
        }
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Both the passwords should Match",
            });
        }
        // verigy the token 
        const userdetails=await User.findOne({resetToken:token});
        if(!userdetails){
            return res.status(400).json({
                success:false,
                message:"invalid Token",
            });
        }
        // check for the token timeer
        if(userdetails.resetTokenTimer <Date.now()){
            return res.status(400).json({
                success:false,
                message:"Token time has expired ,Generate the link again  ",
            });
        }
        // hash pwd
        let hashedpassword=await bcrypt.hash(password,10);
        // update the password in the db
        let updateddetails=await User.findOneAndUpdate({resetToken:token},{password:hashedpassword});
        // send responce 
        res.status(200).json({
            success:true,
            message:"Password Has been changed Successfully",
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in reset password controller",
            data:error.message
        });   
    }
}
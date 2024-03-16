const User=require("../Models/User");
const Otp=require("../Models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
// ---------------------------------send otp -----------------------------------
exports.sendotp=async(req,res)=>{
    try {
        // fetch email from body 
        let {email}=req.body;
        // perform validation
        if(!email){
            return res.status(400).json({
                success:false,
                message:"fill in all the details",
            });
        }
        // check if user already exist in the db or not 
        const userdetails =await User.findOne({email});
        if(userdetails){
            return res.status(400).json({
                success:false,
                message:"User already exist with this mail id ",
            });
        }
        // generate a otp 
        let generatedotp;
        try {
             generatedotp=otpGenerator.generate(6,{lowerCaseAlphabets:false,specialChars:false,upperCaseAlphabets:false});
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"error in generating a otp",
                data:error,
            });
        }
        // save this otp & email  in the otp model and that model will send the mail 
        let savedopt=await Otp.create({
            email:email,
            otp:generatedotp,
        });
        // send responce
        res.status(200).json({
            success:true,
            message:"Otp sent Successfully",
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in sendotp controller",
            data:error,
        })
    }
}

// ------------------------------------------signup----------------------------------- 
exports.signup=async(req,res)=>{
    try {
        // fetch email otp ,newpass,confirmpass
        let {firstName,lastName,accountType,email,otp,password,confirmPassword}=req.body;
        // validate all the info
        if(!firstName||!lastName||!accountType||!email||!otp||!password||!confirmPassword){
            return res.status(400).json({
                success:false,
                message:"fill in all the details",
            });
        }
        if(password !==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirm password should be the same ",
            });
        }
        //check if the user exist 
        let userdetails=await User.findOne({email});
        if(userdetails){
            return res.status(400).json({
                success:false,
                message:"User already exist with this mail id ",
            });
        }
        // check the otp 
        let securedopt=await Otp.findOne({email});
        // if otp is expired 
        if(!securedopt){
            return res.status(400).json({
                success:false,
                message:"otp exired ,Try again",
            });
        }
        // if otp is wrong 
        if(otp !== securedopt.otp){
            return res.status(400).json({
                success:false,
                message:"Wrong otp,Try again",
            });
        } 
        // if we are here means every thing is okay, now hash the pwd 
        let hashedpassword;
        try {
             hashedpassword=await bcrypt.hash(password,10);
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"error in hashing the password",
            });
        }
        // create image font 
        let dpimage=await `https://ui-avatars.com/api/?name=${firstName}+${lastName}`;
        // save the email and hashedpassword to the db 
        let saveduser;
        try {
             saveduser=await User.create({
                email:email,
                password:hashedpassword,
                firstName,
                lastName,
                accountType,
                image:dpimage
            })
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"error in added user to the db ",
                data:error,
            });
        }
        // return the respoce 
        res.status(200).json({
            success:true,
            messagae:"User Created Sussessfully",
            data:saveduser,
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in signup controller ",
            data:error,
        })
    }
}

//------------------------------------------- login__________________________-
exports.login=async(req,res)=>{
    try {
        // fetch value from req body
        let {email,password}=req.body;
        // perform basic validation
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"fill in all the details",
            });
        }
        // check if the user exist or not 
        let userdetails=await User.findOne({email});
        if(!userdetails){
            return res.status(400).json({
                success:false,
                message:"email is not registered ,Please signUP",
            });
        }
        // now check the password
        if(!await bcrypt.compare(password,userdetails.password)){
            return res.status(400).json({
                success:false,
                message:"Wrong Password ,try again:)",
            });
        }
        // if we are here then everythin is okay 
        // create a token
        const payload={
            email:userdetails.email,
            id:userdetails._id,
            role:userdetails.accountType,
        }
        userdetails.password=null;
        const token= jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h",
        });
        const cookieoptions={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }
        // now send this token in respocen and in cookie as well 
        res.cookie("token",token,cookieoptions).status(200).json({
            success:true,
            message:"Successfully Loged IN",
            token,
            userdetails,
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in login controller",
            data:error,
        })
    }
}

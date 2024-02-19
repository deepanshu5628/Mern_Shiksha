const jwt=require("jsonwebtoken");
// is logedin
exports.islogedin=async(req,res,next)=>{
    try {
    // find token from headers
    // perform basic validation
    let tok=req.headers.authorization;
    let token=tok.replace("Bearer ","");
    
    // validation on token
    if(!token){
        return res.status(400).json({
            success:false,
            message:"Token is missing,Please login ",
        });
    };
    // fill the current user details in the req.user
    let payload;
    try {
         payload=jwt.verify(token,process.env.JWT_SECRET);
        //  console.log(payload);
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Token is invalid!",
        });
    }
    req.user=payload;
    next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in islogedin middleware",
            data:error.message
        });   
    }
}
// is student
exports.isStudent=async(req,res,next)=>{
    try {
        // fetch payload form the req.user 
        let payload=req.user;
        // check the role 
        if(payload.role!=="Student"){
            return res.status(400).json({
                success:false,
                message:"this is a protected route for students only !:)",
            });   
        }
        next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in isStudent middleware",
            data:error.message
        });   
    }
}
// is instructor
exports.isInstructor=async(req,res,next)=>{
    try {
        // fetch payload form the req.user 
        let payload=req.user;
        // check the role 
        if(payload.role!=="Instructor"){
            return res.status(400).json({
                success:false,
                message:"this is a protected route for instructor only !:)",
            });   
        }
        next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in instructor middleware",
            data:error.message
        });   
    }
}   

// is admin
exports.isAdmin=async(req,res,next)=>{
    try {
        // fetch payload form the req.user 
        let payload=req.user;
        // check the role 
        if(payload.role!=="Admin"){
            return res.status(400).json({
                success:false,
                message:"this is a protected route for admin only !:)",
            });   
        }
        next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in admin middleware",
            data:error.message
        });   
    }
}
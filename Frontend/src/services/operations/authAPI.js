import { apiconnector } from "../apiconnector";
import {user} from "../apis";
import {setLoading,setSignupData,setToken} from "../../redux/Slices/authSlice";
import {setUser} from "../../redux/Slices/profileSlice";
import {toast } from 'react-toastify';

// -----------------------------login-------------------------------------------------
export const login=(email,password,navigate)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            let res=await apiconnector("POST",user.AUTH_API_LOGIN,{email,password});            
            if(res.success){
                let token=res.token;
                let logindata=res.userdetails;
                console.log(logindata.firstName);
                dispatch(setToken(token));
                dispatch(setUser(logindata));
                localStorage.setItem("token",JSON.stringify(token));
            localStorage.setItem("user",JSON.stringify(logindata));  
            toast.success(res.message);
            navigate("/dashboard/my-profile");
        }
        if(!res.success){
            toast.error(res.message);
        }
    } catch (error) {
        console.log(error);
        toast.error("login failed");
    }
    dispatch(setLoading(false));
}
}

// ------------------------------------Logout-------------------------------------------------
export const logout =(navigate)=>{
    return (dispatch)=>{
        dispatch(setLoading(true));
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out")
        navigate("/");
        dispatch(setLoading(false));
    }
}

// -------------------------------------send Otp------------------------------
export const sendOtp=(email,navigate,signupData)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        let res=await apiconnector("POST",user.AUTH_API_SENDOTP,{email});
        if(!res.success){
            toast.error(res.message);
        }
        if(res.success){
            toast.success("otp Sended Successfully");
            dispatch(setSignupData(signupData));
            localStorage.setItem("signupData",JSON.stringify(signupData));
            navigate("/verifyemail");
        }
        dispatch(setLoading(false));
    }
}


// -------------------------------------Sign UP------------------------------------------
export const signup=(signupData,otp,navigate)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        let res;
        try {
             res=await apiconnector("POST",user.AUTH_API_SIGNUP,{...signupData,otp});
        } catch (error) {
            navigate("/signup")
           return  console.log("error in fetching data form backend");
        }
        if(res.success){
            toast.success("Successfully Registered Log in please");
            navigate("/login");
            dispatch(setSignupData(null));
            localStorage.removeItem("signupData");
        }
        if(!res.success){
            toast.error(res.message);
            // navigate("/signup")
        }
        dispatch(setLoading(false));
        
    }
}

// ----------------------------send reset password token ------------------------------
export const resetpasswordtoken= (email,setisemailsent)=>{
    return async (dispatch)=>{
        dispatch(setLoading(true));
        let res;
        try {
            res=await apiconnector("POST",user.AUTH_API_RESETPASSWORDTOKEN,{email})
        } catch (error) {
           return console.log(error);
        }
        if(res.success){
            toast.success(res.message);
            setisemailsent(true);
        }
        if(!res.success){
            toast.error(res.message);
        }
        dispatch(setLoading(false));

    }
}

// ------------------------------resset password -----------------------------------------
export const ressetpassword=(token,password,confirmPassword,navigate)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        let res;
        try {
            res=await apiconnector("POST",user.AUTH_API_RESETPASSWORD,{token,password,confirmPassword});
        } catch (error) {
            toast.success("unkkonw error occured");
            return  console.log(error);
        }
        if(res.success){
            toast.success(res.message);
            navigate("/login");
        }
        if(!res.success){
            toast.error(res.message);
        }
        dispatch(setLoading(false));

    }
} 
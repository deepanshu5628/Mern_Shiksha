import { apiconnector } from "../apiconnector";
import {user} from "../apis";
import {setLoading,setToken} from "../../redux/Slices/authSlice";
import {setUser} from "../../redux/Slices/profileSlice";
import {toast } from 'react-toastify';

export const login=(email,password,navigate)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            let res=await apiconnector("POST",user.AUTH_API_LOGIN,{email,password});            
            if(res.success){
            let token=res.token;
            let signupData=res.userdetails;
            console.log(signupData.firstName);
            dispatch(setToken(token));
            dispatch(setUser(signupData));
            localStorage.setItem("token",JSON.stringify(token));
            localStorage.setItem("user",JSON.stringify(signupData));  
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

export const logout =(navigate)=>{
    return (dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out")
        navigate("/");
    }
}
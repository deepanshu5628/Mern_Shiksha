import {toast} from "react-toastify"
import { profile } from "../apis";
import {apiconnector, axiosapiconnector} from "../apiconnector";
import {setImage, setLoading,setUser} from "../../redux/Slices/profileSlice"
import {setToken} from "../../redux/Slices/authSlice"

// ------------------------------------Update Dp---------------------------------------------------
export const updateDisplayPicture=(file,token,navigate)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true))        
        let res;
        try {
            res=await axiosapiconnector("POST",profile.PROFILE_API_UPDATEDP,{image:file},{
                "authorization":`Bearer ${token}`,
                "Content-Type":"multipart/form-data",
            })
        } catch (error) {
            toast.error("error error while sending requrest to backend");
            return console.log(error); 
        }

        // console.log(res.data.data);
        if(res.data.success){
            toast.success(res.data.message);
            dispatch(setImage(res.data.data.image));
            localStorage.setItem("image",JSON.stringify(res.data.data.image));
            navigate("/dashboard/my-profile")
        }
        if(!res.data.success){
            toast.error(res.data.message);

        }

        dispatch(setLoading(false));
    }
}

// ----------------------------------Update Profile -------------------------------------------

export const updateprofile=(data,token,navigate)=>{
    return async(dispatch)=>{
        let res;
        dispatch(setLoading(true));
        try {
            res=await apiconnector("POST",profile.PROFILE_API_UPDATEPROFILE,data,{
                "authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
            });
            // console.log(res);
        } catch (error) {
            toast.error("error occuerd while sending requrest to backedn");
            return console.log(error);
        }
        if(res.success){
            toast.success(res.message);
            dispatch(setUser(res.data))
            localStorage.setItem("user",JSON.stringify(res.data));
            navigate("/dashboard/my-profile");
        }
        if(!res.success){
            toast.error(res.message);
        }
        dispatch(setLoading(false));
    }
}

// ------------------------------------Delete Profile---------------------------
export const deleteaccount=(token,navigate)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        let res;
        try {
            res=await apiconnector("DELETE",profile.PROFILE_API_DELETEPROFILE,{data:null},{
                "Content-Type":"application/json",
                "authorization":`Bearer ${token}`,
            });
        } catch (error) {
            toast.error("error occuerd while sending requrest to backedn");
            return  console.log(error);
           
        }
        if(res.success){
            toast.success(res.message);
            dispatch(setImage(null));
            dispatch(setUser(null));
            dispatch(setToken(null));
            localStorage.removeItem("image");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/");
        }
        if(!res.success){
            toast.error(res.message);
        }
        dispatch(setLoading(false));
    }
}
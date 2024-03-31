import { Children } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function PrivateRoute({children}){
    const {token}=useSelector((state)=>state.auth);
    if(token !==null ){
        return children
    }
    else{
        toast.error("You are not authorized to visit this route heelo g")
        return <Navigate to="/"/>
    }
}

export default PrivateRoute;
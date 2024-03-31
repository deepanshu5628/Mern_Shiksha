import { Children } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function SemiPrivate({children}){
    const {token}=useSelector((state)=>state.auth);
    if(token ===null ){
        return children
    }
    else{
        toast.error("Logout First")
        return <Navigate to="/"/>
    }
}

export default SemiPrivate;
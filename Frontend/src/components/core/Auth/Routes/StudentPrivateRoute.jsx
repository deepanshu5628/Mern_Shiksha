
import { Children } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {toast} from "react-toastify"

function InstructorPrivateRoute({ children }) {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    // console.log("user is ", user);
    
     if (token !== null && user.accountType==="Student") {
        return children
    }
    else {
        toast.error("You are not authorized to visit that Route");
        return <Navigate to="/" />
    }
}

export default InstructorPrivateRoute;
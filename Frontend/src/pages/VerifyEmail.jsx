import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/operations/authAPI";

function VerifyEmail(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {signupData}=useSelector((state)=>state.auth);
    let [otp,setopt]=useState("");
    function formsubmithandler(e){
        e.preventDefault();
        dispatch(signup(signupData,otp,navigate));
    }
    return (
        <div>
            <form onSubmit={formsubmithandler}>
            <label >Enter Otp:
                <input type="number" placeholder="enter otp "  value={otp} onChange={(e)=>setopt(e.target.value)}/>
            </label>
            <button >Submit</button>
            </form>
        </div>
    )
}

export default VerifyEmail;
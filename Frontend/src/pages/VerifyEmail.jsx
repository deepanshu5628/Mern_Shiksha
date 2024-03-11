import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../services/operations/authAPI";
import { Link } from "react-router-dom";
import OtpInput from 'react-otp-input';
import {toast } from 'react-toastify';

import { FaArrowLeftLong } from "react-icons/fa6";
import { RxCountdownTimer } from "react-icons/rx";
function VerifyEmail(){
    const navigate=useNavigate();
    const dispatch=useDispatch();


    const {signupData}=useSelector((state)=>state.auth);
    let [otp,setotp]=useState("");

    // form submit  handler fxn
    function formsubmithandler(e){
        e.preventDefault();
        dispatch(signup(signupData,otp,navigate));
    }
    // resend otp handler
    function resendotphandler(){
        dispatch(sendOtp(signupData.email,navigate,signupData));
    }
    return (
        <div className="flex justify-center text-richblack-5  min-h-lvh min-w-min  items-center ">
            <div className=" flex-col min-w-[330px] max-w-[420px]  justify-center items-center ">
                <h1 className="text-4xl font-semibold ">Verify Email:</h1>
                <p className="text-lg my-3 text-richblack-200">A verification code has been sent to you. Enter the code below</p>
            <form onSubmit={formsubmithandler}>
           
             <div >
             <OtpInput
              value={otp}
              onChange={setotp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />

            </div>    
            <br />
            <button className="mt-2 w-full rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900" >Verify Email</button>
            </form>
            <div className="flex  justify-between px-4 py-3 cursor-pointer">
                <Link to={"/signup"}><div className="flex items-center gap-2"> <FaArrowLeftLong /><p>Back To SignUp</p></div></Link>
                <div className="flex items-center gap-2 text-richblue-200" onClick={resendotphandler}><button className="flex justify-center items-center gap-2"><RxCountdownTimer /><p>Resend it</p></button></div>
            </div>
           </div>
        </div>
    )
}

export default VerifyEmail;




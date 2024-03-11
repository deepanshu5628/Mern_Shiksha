import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FaArrowLeftLong } from "react-icons/fa6";
import {Link, useLocation, useNavigate} from "react-router-dom"
import { ressetpassword } from "../services/operations/authAPI";

function Updatepassword(){
    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const token=location.pathname.split("/update-password/")[1];
    console.log(token);
    
    const {loading }=useSelector((state)=>state.auth);

    let [passwordform,setpasswordform]=useState({
        password:"",
        confirmPassword:"",
    })
    
    let [showPassword,setShowPassword]=useState(false);
    let [showConfirmPassword,setShowConfirmPassword]=useState(false);

    function handleOnChange(e){
        setpasswordform((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }

    function submithandler(){
        dispatch(ressetpassword(token,passwordform.password,passwordform.confirmPassword,navigate));
    }
    return (
        <div>
            {
                loading ? <div className="loader"></div>:
                <div className="flex justify-center text-richblack-5  min-h-screen min-w-min  items-center">
                    <div className="flex-col min-w-[330px] max-w-[420px]   justify-center items-center">
                    {/* main heading  */}
                    <h1 className="text-4xl font-semibold ">Choose New Password</h1>
                    {/* description */}
                    <p className="text-lg my-3 text-richblack-200">Almost done.Enter Your new password and you'r all set</p>
                    {/* input box of pass and confirm pass */}
                    
                    <div className=" flex-col gap-x-4 my-3">
                        <label className="relative ">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                              New Password <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                              required
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={passwordform.password}
                              onChange={handleOnChange}
                              placeholder="Enter Password"
                              style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
                              className="w-full mb-3 rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                            />
                            <span
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                              {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                              ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                              )}
                            </span>
                        </label>
                        <label className="relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Confirm New Password <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                              required
                              type={showConfirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={passwordform.confirmPassword}
                              onChange={handleOnChange}
                              placeholder="Confirm Password"
                              style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
                              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                            />
                            <span
                              onClick={() => setShowConfirmPassword((prev) => !prev)}
                              className="absolute right-3 top-[85px] z-[10] cursor-pointer"
                            >
                              {showConfirmPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                              ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                              )}
                            </span>
                        </label>
                        </div>
                        <div>
                            <button className="mt-2 mb-3 w-full rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900" type="submit" onClick={submithandler} >Reset Password</button>
                            <Link to={"/login"}><div className="flex items-center gap-2"> <FaArrowLeftLong /><p>Back To Login</p></div></Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Updatepassword;
import { useState } from "react";
import CTAButton from "../../Homepage/CTAButton";
import { useForm } from "react-hook-form";
import { changepassword } from "../../../../services/operations/authAPI";
import {useDispatch, useSelector} from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Changepassword() {
  const {token}=useSelector((state)=>state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

   function formsubmithandler(data) {
    if(user.email==="studentdemo@gmail.com" || user.email==="teacherdemo@gmail.com"){
      toast.error("try it be smart with your own id ");
      return 
    }
     dispatch(changepassword(data,token,navigate));
  }
  return (
    <>
      <section className="bg-richblack-800 h-auto py-6 px-8 rounded-md w-full md:w-[70%]">
        <h1 className="text-xl font-semibold">Password </h1>
        <form onSubmit={handleSubmit(formsubmithandler)}>
          <div className="md:flex justify-between min-w-full my-2 ">
            {/* curr pass word input  */}
            <label htmlFor="oldpassword" className="w-full">
              New Password
              <br />
              <input
                type="text"
                id="oldpassword"
                placeholder="Enter New Password"
                name="password"
                className="bg-richblack-700 py-3 mt-2 rounded-lg px-3 w-[90%] text-white"
                {...register("password", {
                  required: { value: true, message: "Required" },
                })}
              />
              {errors.password && (
                <span className="text-yellow-50">Required</span>
              )}
            </label>
            {/* new password input  */}
            <label htmlFor="newpassword" className="w-full">
              Confirm New password
              <br />
              <input
                type="text"
                id="newpassword"
                name="confirmpassword"
                placeholder="Enter New Password"
                className="bg-richblack-700 w-[90%] mt-2 rounded-lg py-3 px-3  text-white"
                {...register("confirmpassword", {
                  required: { value: true, message: "Required" },
                })}
              />
              {errors.confirmpassword && (
                <span className="text-yellow-50">Required</span>
              )}
            </label>
          </div>
          {/* two buttons  */}
          <div className="flex justify-end mt-6 mr-9">
            <CTAButton children={"Cancel"} linkto="/dashboard/my-profile" />
            <button 
              className="text-center text-[13px] px-6 py-3 rounded-md 
             font-bold text-black bg-yellow-50 hover:scale-95 transition-all 
             duration-200"
            >
              Update
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
export default Changepassword;

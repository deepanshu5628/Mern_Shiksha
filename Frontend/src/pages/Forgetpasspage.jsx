import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { resetpasswordtoken } from "../services/operations/authAPI";
import { apiconnector } from "../services/apiconnector";
import { user } from "../services/apis";
import Spinner from "../components/common/Spinner"
function Forgetpasspage() {
  const dispatch = useDispatch();
  let [email, setemail] = useState("");
  let [isemailsend, setisemailsent] = useState(false);
  let { loading } = useSelector((state) => state.auth);

  function handleOnChange(e) {
    setemail(e.target.value);
  }

  async function submithandler() {
    dispatch(resetpasswordtoken(email, setisemailsent));
  }

  return (
    <div>
      {
        loading ? <Spinner /> :
          <div className="flex justify-center text-richblack-5  min-h-screen min-w-min  items-center">
            <div className=" flex-col min-w-[330px] max-w-[420px]   justify-center items-center ">
              <h1 className="text-4xl font-semibold ">{isemailsend ? "Check email" : "Reset your password:"}</h1>
              <p className="text-xl my-3 text-richblack-200">{isemailsend ? `We have sent the reset email to ${email}` : "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"}</p>
              <div className="my-3">
                {
                  isemailsend ? null :
                    <label className="w-full ">
                      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Email Address <sup className="text-pink-200">*</sup>
                      </p>
                      <input
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter email address"
                        style={{
                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                      />
                    </label>
                }

              </div>
              <div>
                <button className="mt-2 mb-3 w-full rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900" type="submit" onClick={submithandler} >{isemailsend ? "Resend email" : "Submit"}</button>
                <Link to={"/login"}><div className="flex items-center gap-2"> <FaArrowLeftLong /><p>Back To Login</p></div></Link>
              </div>

            </div>
          </div>
      }
    </div>
  )
}

export default Forgetpasspage;
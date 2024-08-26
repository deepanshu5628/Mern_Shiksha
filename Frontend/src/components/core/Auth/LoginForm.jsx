import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { apiconnector } from "../../../services/apiconnector";
import { user } from "../../../services/apis";
import { login } from "../../../services/operations/authAPI";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let [studentcheckbox,setstudentcheckbox]=useState(false);
  let [teachercheckbox,setteachercheckbox]=useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setteachercheckbox(false);
      setstudentcheckbox(false);
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    dispatch(login(email, password, navigate));
  };

  let handleradio=(e)=>{
    let {id}=e.target;
    let studata={
      email: "studentdemo@gmail.com",
      password: "studentdemo",
    }
    let teadata={
      email: "teacherdemo@gmail.com",
      password: "teacherdemo",
    }
    if(id=="student"){
      setteachercheckbox(false);
      setstudentcheckbox(true);
      setFormData(studata);
    }
    if(id=="teacher"){
      setstudentcheckbox(false);
      setteachercheckbox(true);
      setFormData(teadata);
    }

  }

  return (
    <div>
      <form
        onSubmit={handleOnSubmit}
        className="mt-6 flex w-full flex-col gap-y-4"
      >
        <label className="w-full">
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
        <label className="relative">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
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
          <Link to="/forgot-password">
            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
              Forgot Password
            </p>
          </Link>
        </label>
        {/* login with demo account's  */}
        <div className=" flex flex-col gap-2  md:flex-row md:justify-between">
          {/* login as student */}
          <div className="flex items-center gap-2">
            <label htmlFor="student" className="text-richblack-25">Login with Demo Student id</label>
            <input  className="text-5xl" type="checkbox" checked={studentcheckbox} onChange={handleradio}  name="demo" id="student" />
          </div>
          {/* login as teacher  */}
          <div className="flex items-center gap-2">
            <label htmlFor="teacher" className="text-richblack-25">Login with Demo Teacher id</label>
            <input className="text-5xl" type="checkbox" checked={teachercheckbox} onChange={handleradio} name="demo" id="teacher" />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

import { useSelector } from "react-redux";
import CTAButton from "../Homepage/CTAButton";
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
function Setting() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="flex flex-col text-richblack-5 items-center my-4 gap-6 w-[100%]">
      <h1 className="text-4xl  font-semibold text-richblack-25">
        Edit Profile
      </h1>

      {/* section 1  phtoo upload*/}
      <section className="bg-richblack-800 h-auto py-6 px-8 rounded-md w-[70%] flex justify-between items-center">
        <div className="flex gap-3">
          {/* image div  */}
          <div>
            <img className="rounded-full " src={user.image} alt="" />
          </div>
          {/* name email div */}
          <div className="flex-col ">
            <p className="text-white font-semibold pb-2 text-lg">
              Change Profile Picture
            </p>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 
             rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            />
          </div>
        </div>
        <div>
          <button
            className="flex items-center gap-2 text-center
          hover:scale-95 transition-all duration-200 text-black
           bg-caribbeangreen-200 text-[13px] px-6 py-3
            rounded-md  font-bold"
          >
            Upload <IoMdCloudUpload className="text-2xl" />
          </button>
        </div>
      </section>

      {/* section 2  name and addit info*/}
      <section className="bg-richblack-800 h-auto py-6 px-8 rounded-md w-[70%] ">
        <h1 className="text-2xl font-semibold">Profile Information</h1>
        <div>
          <form>
            {/* first and last name  */}
            <div className="flex justify-between min-w-full my-2 ">
              <label htmlFor="firstname" className="w-full">
                First Name
                <br />
                <input
                  type="text"
                  id="firstname"
                  value={user.firstName}
                  name="firstName"
                  className="bg-richblack-700 mt-2 py-3 rounded-lg px-3 w-[90%] text-white"
                />
              </label>
              <label htmlFor="lastname" className="w-full">
                Last Name
                <br />
                <input
                  type="text"
                  id="lastname"
                  value={user.lastName}
                  name="lastname"
                  className="bg-richblack-700 mt-2 w-[90%] rounded-lg py-3 px-3  text-white"
                />
              </label>
            </div>
            {/* dob and gender */}
            <div className="flex justify-between min-w-full my-2">
              <label htmlFor="firstname" className="w-full">
                DOB
                <br />
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="bg-richblack-700 mt-2 py-3 rounded-lg px-3 w-[90%] text-white"
                />
              </label>
              <label htmlFor="gender" className="w-full">
                Gender
                <br />
                <select className="bg-richblack-700 mt-2 py-3 rounded-lg px-3 w-[90%] text-white">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
            </div>
            {/* contactno and about  */}
            <div className="flex justify-between w-full my-2">
              <label htmlFor="contactNo" className="w-full">
                Contact Number
                <br />
                <input
                  type="number"
                  id="contactNo"
                  placeholder="Enter Contact Number"
                  name="contactNo"
                  className="bg-richblack-700 py-3 mt-2 rounded-lg px-3 w-[90%] text-white"
                />
              </label>
              <label htmlFor="about" className="w-full ">
                About
                <br />
                <input
                  type="text"
                  id="about"
                  name="about"
                  placeholder="Enter Bio Details"
                  className="bg-richblack-700 py-3 mt-2 rounded-lg px-3 w-[90%] text-white"
                />
              </label>
            </div>
            <div className="flex justify-end mt-6 mr-9">
              <CTAButton children={"Cancel"} linkto="/dashboard/my-profile" />
              <CTAButton children={"Save"} active={true} />
            </div>
          </form>
        </div>
      </section>
      {/* section 3   password changle*/}
      <section className="bg-richblack-800 h-auto py-6 px-8 rounded-md w-[70%]">
        <h1 className="text-xl font-semibold">Password </h1>
        <form>
          <div className="flex justify-between min-w-full my-2 ">
            <label htmlFor="oldpassword" className="w-full">
              Current password
              <br />
              <input
                type="text"
                id="oldpassword"
                placeholder="Enter Current Password"
                name="oldpassword"
                className="bg-richblack-700 py-3 mt-2 rounded-lg px-3 w-[90%] text-white"
              />
            </label>
            <label htmlFor="newpassword" className="w-full">
              New password
              <br />
              <input
                type="text"
                id="newpassword"
                name="newpassword"
                placeholder="Enter New Password"
                className="bg-richblack-700 w-[90%] mt-2 rounded-lg py-3 px-3  text-white"
              />
            </label>
          </div>
          <div className="flex justify-end mt-6 mr-9">
            <CTAButton children={"Cancel"} linkto="/dashboard/my-profile" />
            <CTAButton children={"Update"} active={true} />
          </div>
        </form>
      </section>

      {/* section 4 delete account */}
      <section className="bg-pink-800 flex items-center gap-6 h-auto py-6 px-8 rounded-md w-[70%]">
        {/* icon div */}
        <div className="text-pink-500 text-7xl  ">
          <MdDelete  className="border rounded-full bg-pink-900 p-3"/>
        </div>
        {/* info div */}
        <div className="w-[60%] bg-pink-800">
          <h2 className="font-semibold">Delete Account</h2>
          <p>Would you like to delete account?</p>
          <p>
            This account may contain Paid Courses. Deleting your account is
            permanent and will remove all the contain associated with it.
          </p>
          <Link > <p className="italic ">I want to delete my account.</p> </Link>
        </div>
      </section>
    </div>
  );
}

export default Setting;

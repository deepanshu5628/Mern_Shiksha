import { useSelector } from "react-redux";
import CTAButton from "../Homepage/CTAButton";
import { MdModeEdit } from "react-icons/md";

function Myprofile() {
  const { user, image } = useSelector((state) => state.profile);

  return (
    <div className="flex flex-col  text-richblack-5 justify-center items-center my-4 gap-6 w-[100%]">
      <h1 className="text-4xl  font-semibold text-richblack-25">My Profile</h1>

      {/* first section */}
      <section className="bg-richblack-800 h-auto py-6 rounded-md px-8 min-w-fit w-full md:w-[70%] flex justify-between items-center">
        <div className="flex-col md:flex gap-3">
          {/* image div  */}
          <div>
            <img className="rounded-full  w-20 h-20 " src={image} alt="" />
          </div>
          {/* name email div */}
          <div >
            <p className="text-white font-bold text-lg">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-richblack-100">{user.email}</p>
          </div>
        </div>
        {/* btn */}
        <div>
          <CTAButton
            active={true}
            linkto="/dashboard/setting"
            children={
              <div className="flex items-center gap-2">
                <p>Edit</p>
                <MdModeEdit />
              </div>
            }
          />
        </div>
      </section>

      {/* second section about div */}
      <section className="bg-richblack-800 h-auto py-6 rounded-md px-8 w-full md:w-[70%] md:flex-col  justify-between items-center">
        {/* first div  */}
        <div className="flex mb-4 justify-between w-full">
          <div>
            <p className="text-2xl font-semibold">About:</p>
          </div>
          <CTAButton
            active={true}
            linkto="/dashboard/setting"
            children={
              <div className="flex items-center gap-2">
                <p>Edit</p>
                <MdModeEdit />
              </div>
            }
          />
        </div>
        {/* second div */}
        <div className="flex  text-richblack-100 min-h-fit flex-wrap">
          {user.additionalInformation ? (
            <p className="sm:text-sm md:text-md">{user.additionalInformation.about}</p>
            // <p className="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos placeat magni odit numquam dolores eligendi velit beatae eius explicabo facere consequuntur, facilis dolore cum corrupti quam tenetur rerum enim ea.</p>
            // <p>2</p>
          ) : (
            "Write something about yourself...."
          )}
        </div>
      </section>

      {/* third section */}
      <section className="bg-richblack-800 h-auto py-6 px-8 rounded-md w-full md:w-[70%] flex-col justify-between items-center ">
        <div className="flex  justify-between w-full">
          <div>
            <p className="text-2xl font-bold">Personal Details</p>
          </div>
          <CTAButton
            linkto="/dashboard/setting"
            active={true}
            children={
              <div className="flex items-center gap-2">
                <p>Edit</p>
                <MdModeEdit />
              </div>
            }
          />
        </div>
        <div className="w-full flex-col ">
          {/* first and last name  */}
          <div className="flex flex-col  md:flex-row md:justify-start p-4 text-center md:text-start">
            <div className="w-full">
              <p className="text-richblack-300   mb-1">First Name</p>
              <p className="">{user.firstName}</p>
            </div>
            <div className="w-full text-center md:text-start">
              <p className="text-richblack-300 mb-1">Last Name</p>
              <p>{user.lastName}</p>
            </div>
          </div>

          {/* email and phone no  */}
          <div className="flex flex-col md:flex-row justify-start p-4 w-full">
            <div className="w-full text-center md:text-start">
              <p className="text-richblack-300 mb-1">Email</p>
              <p>{user.email}</p>
            </div>
            <div className="w-full text-center md:text-start">
              <p className="text-richblack-300 mb-1"> Phone Number</p>
              <p>{user.additionalInformation ? user.additionalInformation.contactNo : "Add Contact No"}</p>
            </div>
          </div>
          {/* gender and DOB */}
          <div className="flex flex-col md:flex-row  justify-start p-4 text-center md:text-start ">
            <div className="w-full ">
              <p className="text-richblack-300 mb-1">Gender</p>
              <p>{user.additionalInformation ? user.additionalInformation.gender : "Add Gender"}</p>
            </div>
            <div className="w-full">
              <p className="text-richblack-300 mb-1">DOB</p>
              <p>{user.additionalInformation ? user.additionalInformation.dob : "Add Dob"}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Myprofile;

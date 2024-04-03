import { useSelector } from "react-redux";
import { IoTrashBinOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MdOutlineWavingHand } from "react-icons/md";
import { instructorCoursesdetails } from "../../../../services/operations/courseDetailsAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Instructor() {
    const navigate = useNavigate();
    let { token } = useSelector((state) => state.auth);
    let { user } = useSelector((state) => state.profile);
    const [courses, setcourses] = useState(null);
    const [totalearning,settotalearning]=useState(0);
    const [totalstudents,settotalstudents]=useState(0);
    let [loading, setloading] = useState(false);


    let fetchinstructorcourses = async () => {
        let res;
        try {
             res = await instructorCoursesdetails(token);
            // console.log(res);
            if (res.success) {
                setcourses(res.coursedetail);
                if(res.coursedetail.length>0){                    
                    res.coursedetail.map((cour)=>{
                        settotalearning((prev)=>(
                            prev+=cour.price
                        ))
                        settotalstudents((prev)=>(
                            prev+=cour.enrolledStudents.length
                        ))
                    })
                }
            }
            if (!res.success) {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("error White fetching Instructor details");
            console.log(error)
            return;
        }
    }
    useEffect(() => {
        setloading(true);
        fetchinstructorcourses();
        setloading(false);
    }, [])
    return (
        <>
            {
                loading ? <div className="loader"></div> : (
                    courses !== null && courses.length > 0 ? (
                        <div className="flex flex-col text-richblack-5 justify-center items-center my-4 gap-6 w-[100%]">
                            <div className="w-[90%] flex-col  bg-richblack-900 p-4 rounded-md">
                                {/* heading section */}
                                <div className="flex-col gap-3" >
                                    <p className="text-3xl font-semibold flex items-center gap-3">Hi {user.firstName} {user.lastName} <MdOutlineWavingHand className="text-yellow-5" /></p>
                                    <p className="text-richblack-100 text-lg my-4">Let's start something new</p>
                                </div>

                                {/* stats section */}
                                <div className="flex w-full  justify-between bg-richblack-900 my-2">
                                    <div className="bg-richblack-800 rounded-md p-4 w-[70%]">
                                        <p className="font-semibold text-2xl"> Visualize </p>
                                        {/* if enrolled studets are 0 then say not enought data to visualize */}
                                        {
                                            totalstudents ===0 && <div  className="flex justify-center items-center w-full h-full">
                                              <p className="text-3xl text-pink-600 font-semibold mb-10">  Not Enough Data to Visualize </p>
                                            </div>
                                        }
                                    </div>
                                    <div className="bg-richblack-800 flex-col  rounded-md p-4 w-[28%]">
                                        <p className="font-semibold text-2xl my-1">Statistics </p>
                                        <div className="my-1">
                                            <p className="text-xl text-richblack-100">Total Courses</p>
                                            <p className="font-semibold text-3xl">{courses.length}</p>
                                        </div>
                                        <div className="my-1">
                                            <p className="text-xl text-richblack-100">Total Students</p>
                                            <p className="font-semibold text-3xl">{totalstudents}</p>
                                        </div>
                                        <div className="my-1">
                                            <p className="text-xl text-richblack-100">Total income</p>
                                            <p className="font-semibold text-3xl">Rs.{totalearning}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* show 3 Courses */}
                                <div className="flex-col w-full  justify-between bg-richblack-800 my-4 rounded-md">
                                    <div className="flex w-full justify-between  p-4">
                                        <p className="text-xl font-semibold">Your Courses</p>
                                        <p onClick={() => navigate("/dashboard/my-courses")} className="text-yellow-50 cursor-pointer">View All</p>
                                    </div>
                                    <div className="flex p-2 pb-5 justify-evenly">
                                        {
                                            courses.slice(0, 3).map((cour, index) => {
                                                return <div key={index} onClick={() => navigate("dashboard/my-courses")} className="px-2 flex-col cursor-pointer">
                                                    <img className="w-72 h-52" src={cour.thumbnail} alt="" />
                                                    <p>{cour.courseName}</p>
                                                    <p>{cour.enrolledStudents.length} students | Rs.{cour.price}</p>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>)
                        :
                        <div className="flex flex-col text-richblack-5 justify-center items-center my-4 gap-6 w-[100%]">
                            <div className="w-[80%]  bg-richblack-800 p-4 rounded-md">
                                <div className="flex-col gap-3" >
                                    <p className="text-3xl font-semibold flex items-center gap-3">Hi {user.firstName} {user.lastName} <MdOutlineWavingHand className="text-yellow-5" /></p>
                                    <p className="text-richblack-100 text-lg my-4">Let's start something new</p>
                                </div>
                                <div className="mt-5 flex-col text-center  pb-16  text-xl font-semibold">
                                    <div className="text-center  ">
                                        <p>Your Do Not Have Any Courses</p>{" "}
                                    </div>
                                    <div className="w-full flex justify-center">
                                        <div onClick={() => navigate("/dashboard/add-course")} className="text-xl bg-yellow-50 w-fit p-2 text-black mt-10 rounded-md  cursor-pointer">
                                            <button >Create Course</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                )
            }
        </>

    )
}

export default Instructor;
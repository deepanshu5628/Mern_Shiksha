


import { useEffect, useState } from "react"
import { deleteCourse, instructorCoursesdetails } from "../../../services/operations/courseDetailsAPI"
import { setCourse, setInstructorCourses } from "../../../redux/Slices/courseSlice";
import { IoTrashBin } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {toast} from "react-toastify"
import { CiCirclePlus } from "react-icons/ci";
function MyCourses() {
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { instructorcourses } = useSelector((state) => state.course);

    // console.log(instructorcourses)
    // fxn to fetch the details of Instructor Courses
    async function fetchinstructorcourse() {
        setloading(true);
        let res;
       try {
         res = await instructorCoursesdetails(token);
        //  console.log(res);
         if(res.success){
            dispatch(setInstructorCourses(res.coursedetail));
            localStorage.setItem("instructorcourses", JSON.stringify(res.coursedetail));
         }
         if(!res.success){
            toast.error(res.message);
         }
       } catch (error) {
        console.log("error occrued in mY courses");
        console.log(error);
        setloading(false);
        return 
       }
       setloading(false);
    }
    useEffect(() => {
        fetchinstructorcourse();
    }, [])

    // fxn to edit a course
    const editcourse=async(courseId)=>{
        // console.log("button is clicked")
        navigate("/dashboard/edit-course",{state:{data:courseId}});
    }

    // fxn to delte a course
    const delcourse=async (courseId)=>{
        // console.log("Button is cliked",courseId);
        let res=await deleteCourse(courseId,token);
        fetchinstructorcourse();
        // console.log(res);
    }
    return (
        <>
            {
                loading ? <div className="loader"></div> :
                    <div className="flex flex-col  text-richblack-5 justify-center items-center my-4 gap-6 w-[100%]">
                        <section className="w-full  md:w-[70%] rounded-lg py-3 px-7  pb-10 flex-col items-center justify-center bg-richblack-800 ">

                            {/* heading div */}
                            <div className="flex justify-between  rounded-2xl w-full md:my-5 md:px-4 md:pr-11  ">
                                <h1 className="text-xl md:text-3xl  font-semibold text-richblack-25">My Course</h1>
                                <button
                                    onClick={() => navigate("/dashboard/add-course")}

                                    className="flex items-center gap-1 bg-yellow-50 font-semibold text-black rounded-md p-1 md:p-2">Add Course <CiCirclePlus className="text-lg" /></button>
                            </div>

                            {
                                instructorcourses != null && instructorcourses.length < 1 ? <div className="flex h-80 justify-center items-center"><p className="text-4xl">Empty </p> <IoTrashBin className="text-7xl text-pink-600" /></div> :


                                    /* table */
                                    <table className="w-full   mt-5">
                                        <thead >
                                            <th className="w-[74%] md:w-[74%] text-start md:pl-4">Courses</th>
                                            <th className="w-[13%] md:w-[13%] text-start">Price</th>
                                            <th className="w-[13%] md:w-[13%] text-start">Action</th>
                                        </thead>
                                        <tbody  >

                                            {
                                                instructorcourses !== null &&instructorcourses.length>0&& instructorcourses.map((onecourse,index) => {
                                                    return < >
                                                        <tr key={index}  >
                                                            <td className="">
                                                                <div className="flex gap-2 md:gap-6 my-5">
                                                                    <div >
                                                                        <img className="rounded-lg min-h-32 md:min-w-48 md:h-28 md:pl-4 md:mt-4 "
                                                                            src={onecourse.thumbnail} alt="thmbnail" />
                                                                    </div>
                                                                    <div className="flex-col w-auto " >
                                                                        <p className="font-semibold text-base md:text-2xl my-2 ">{onecourse.courseName}</p>
                                                                        <p className="my-2 text-richblack-50"> {onecourse.courseDescription.length>30?onecourse.courseDescription.substring(0,20)+"...":onecourse.courseDescription}</p>
                                                                        {/* <p>{onecouse.createdAt}</p> */}
                                                                        <p className={`  ${onecourse.status === "Published" ? "bg-caribbeangreen-300 text-black rounded-lg p-1 md:p-2 w-20 md:w-24" : "bg-pink-600 text-white rounded-lg p-2 w-16"}`}>
                                                                            {onecourse.status}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>{onecourse.price}</td>
                                                            <td>
                                                                <div  className="text-lg">
                                                                    <button onClick={()=>editcourse(onecourse._id)} className="pr-3"><MdModeEditOutline /></button>
                                                                    <button onClick={()=>delcourse(onecourse._id)}><MdDelete /></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </>
                                                })
                                            }

                                        </tbody>
                                    </table>
                            }
                        </section>
                    </div>
            }
        </>
    )
}

export default MyCourses














































// import { useEffect, useState } from "react"
// import { instructorCoursesdetails } from "../../../services/operations/courseDetailsAPI"
// import { setCourse } from "../../../redux/Slices/courseSlice";
// import { IoTrashBin } from "react-icons/io5";
// import { MdDelete } from "react-icons/md";
// import { MdModeEditOutline } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { CiCirclePlus } from "react-icons/ci";
// function MyCourses() {
//     const [loading, setloading] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { token } = useSelector((state) => state.auth);
//     const { course } = useSelector((state) => state.course);
//     console.log("in mycourse.jsx",course);
//     async function fetchinstructorcourse() {
//         setloading(true);
//         let res = await instructorCoursesdetails(token);
//         // console.log(res);
//         dispatch(setCourse(res.coursedetail));
//         localStorage.setItem("course", JSON.stringify(res.coursedetail));
//         setloading(false);
//     }
//     useEffect(() => {
//         fetchinstructorcourse();
//     }, [])
//     return (
//         <>
//             {
//                 loading ? <div className="loader"></div> :
//                     <div className="flex flex-col text-richblack-5 justify-center items-center my-4 gap-6 w-[100%]">
//                         <section className="w-[70%] rounded-lg py-3 pb-10 flex-col items-center justify-center bg-richblack-800 ">

//                             {/* heading div */}
//                             <div className="flex justify-between  rounded-2xl w-full my-5 px-4 ">
//                                 <h1 className="text-3xl  font-semibold text-richblack-25">My Course</h1>
//                                 <button
//                                     onClick={() => navigate("/dashboard/add-course")}

//                                     className="flex items-center gap-1 bg-yellow-50 font-semibold text-black rounded-md p-2">Add Course <CiCirclePlus className="text-lg" /></button>
//                             </div>

//                             {
//                                 course !== null && course.length < 1 ? <div className="flex h-80 justify-center items-center"><p className="text-4xl">Empty </p> <IoTrashBin className="text-7xl text-pink-600" /></div> :


//                                     /* table */
//                                     <table className="w-full   mt-5">
//                                         <thead >
//                                             <th className="w-[74%] text-start pl-4">Courses</th>
//                                             <th className="w-[13%] text-start">Price</th>
//                                             <th className="w-[13%] text-start">Action</th>
//                                         </thead>
//                                         <tbody className="" >
//                                             <tr>
                                              
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                             }
//                         </section>
//                     </div>
//             }
//         </>
//     )
// }

// export default MyCourses




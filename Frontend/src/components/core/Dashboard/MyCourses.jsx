import { useEffect, useState } from "react"
import { deleteCourse, instructorCoursesdetails } from "../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../redux/Slices/courseSlice";
import { IoTrashBin } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { CiCirclePlus } from "react-icons/ci";
function MyCourses() {
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);


    // fxn to fetch the details of Instructor Courses
    async function fetchinstructorcourse() {
        setloading(true);
        let res;
       try {
         res = await instructorCoursesdetails(token);
       } catch (error) {
        console.log("error occrued in mY courses");
        console.log(error);
        setloading(false);
        return 
       }
        // console.log(res);
            dispatch(setCourse(res.coursedetail));
            localStorage.setItem("course", JSON.stringify(res.coursedetail));
            setloading(false);
       
    }
    useEffect(() => {
        fetchinstructorcourse();
    }, [])


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
                    <div className="flex flex-col text-richblack-5 justify-center items-center my-4 gap-6 w-[100%]">
                        <section className="w-[70%] rounded-lg py-3 pb-10 flex-col items-center justify-center bg-richblack-800 ">

                            {/* heading div */}
                            <div className="flex justify-between  rounded-2xl w-full my-5 px-4 ">
                                <h1 className="text-3xl  font-semibold text-richblack-25">My Course</h1>
                                <button
                                    onClick={() => navigate("/dashboard/add-course")}

                                    className="flex items-center gap-1 bg-yellow-50 font-semibold text-black rounded-md p-2">Add Course <CiCirclePlus className="text-lg" /></button>
                            </div>

                            {
                                course !== null && course.length < 1 ? <div className="flex h-80 justify-center items-center"><p className="text-4xl">Empty </p> <IoTrashBin className="text-7xl text-pink-600" /></div> :


                                    /* table */
                                    <table className="w-full   mt-5">
                                        <thead >
                                            <th className="w-[74%] text-start pl-4">Courses</th>
                                            <th className="w-[13%] text-start">Price</th>
                                            <th className="w-[13%] text-start">Action</th>
                                        </thead>
                                        <tbody  >

                                            {
                                                course !== null && course.map((onecourse,index) => {
                                                    return < >
                                                        <tr key={index} >
                                                            <td>
                                                                <div className="flex gap-6">
                                                                    <div >
                                                                        <img className="rounded-lg w-56 h-28 pl-4 mt-4 "
                                                                            src={onecourse.thumbnail} alt="thmbnail" />
                                                                    </div>
                                                                    <div className="flex-col w-auto " >
                                                                        <p className="font-semibold text-2xl my-2 ">{onecourse.courseName}</p>
                                                                        <p className="my-2 text-richblack-50"> {onecourse.courseDescription}</p>
                                                                        {/* <p>{onecouse.createdAt}</p> */}
                                                                        <p className={`  ${onecourse.status === "Published" ? "bg-caribbeangreen-300 text-black rounded-lg p-2 w-24" : "bg-pink-600 text-white rounded-lg p-2 w-16"}`}>
                                                                            {onecourse.status}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>{onecourse.price}</td>
                                                            <td>
                                                                <div  className="text-lg">
                                                                    <button className="pr-3"><MdModeEditOutline /></button>
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





// {
//     course !== null && course.map((onecouse) => {
//         return <div className="bg-pink-25">
//             <div className="flex bg-yellow-5">
//                 <td><div className="flex  items-center gap-4">
//                     <div >
//                         <img className="rounded-lg w-56 h-28 pl-4 mt-4 "
//                             src={onecouse.thumbnail} alt="thmbnail" />
//                     </div>
//                     <div className="flex-col w-auto " >
//                         <p className="font-semibold text-2xl my-2 ">{onecouse.courseName}</p>
//                         <p className="my-2 text-richblack-50"> {onecouse.courseDescription}</p>
//                         {/* <p>{onecouse.createdAt}</p> */}
//                         <p className={` w-auto ${onecouse.status === "Published" ? "bg-caribbeangreen-300 text-black rounded-md p-2 w-auto" : "bg-pink-600 rounded-md p-2 w-auto"}`}>
//                             {onecouse.status}
//                         </p>
//                     </div>
//                 </div>
//                 </td>

//             </div>
//             <div className="flex">
//                 <div>
//                     <td>{onecouse.price}</td>
//                 </div>
//                 <td><div className="flex-col text-lg ">
//                     <button className="px-2"></button>
//                     <button className="" ></button>
//                 </div></td>
//             </div>
//         </div>
//     })
// }
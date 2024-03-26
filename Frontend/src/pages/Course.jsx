import { useEffect, useState } from "react";
import { getcoursedetails } from "../services/operations/courseDetailsAPI"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaVideo } from "react-icons/fa6";
import { IoIosArrowDropdownCircle } from "react-icons/io";
function Course() {
    const parmas = useParams();
    let courseId = parmas.CourseId;
    // console.log(courseId);

    let [coursedetails, setcoursedetails] = useState(null);
    let [loading, setloading] = useState(false);
    // console.log("course details R", coursedetails);
    useEffect(() => {
        async function fetchcoursedetails() {
            setloading(true);
            let res;
            try {
                res = await getcoursedetails(courseId);
            } catch (error) {
                toast.error("error while fetching course detials from backend");
                setloading(false);
            }
            if (res.success) {
                setcoursedetails(res.coursedetails)
            }
            if (!res.success) {
                toast.error("Course Details Not Found");
            }
            setloading(false);
        }
        fetchcoursedetails();
    }, [])
    return (
        <>
            {
                loading ? <div className="loader"></div> :
                    <div className="w-screen h-auto  bg-richblack-900 text-white ">
                        {
                            coursedetails !== null && (
                                <div>
                                    {/* section 1 */}
                                    <section className="flex-col p-6 justify-center bg-richblack-800">
                                        <p className="text-4xl my-2 font-bold">{coursedetails.courseName}</p>
                                        <p className="text-lg my-2 text-richblack-200">{coursedetails.courseDescription}</p>
                                        <p className="text-lg my-2">Created By {coursedetails.Instructor.firstName} {coursedetails.Instructor.lastName}</p>
                                        <p className="text-lg my-2">Created On {coursedetails.createdAt.slice(0, 10)}  </p>
                                    </section>
                                    {/* section 2 */}
                                    <section className="flex w-full h-auto p-2 pr-5 my-4 pb-8 bg-richblack-900 justify-around">
                                        {/* first div */}
                                        <div className="w-[62%] flex-col mt-4  ">
                                            <div className="border-2 rounded-lg mb-5 border-richblack-300">
                                                <p className="text-4xl font-semibold p-5">What You Will Learn </p>
                                                <p className="px-5  pb-5 text-2xl text-richblack-200">{coursedetails.whatYouWillLearn}</p>
                                            </div>
                                            <div className="">
                                                <p className="text-4xl font-semibold my-4 ">Course Content</p>
                                                <p className="mb-4">{coursedetails.courseContent.length} Section  Lecture</p>
                                                <div  className="border-2 border-richblack-500 rounded-md" >
                                                    {
                                                        coursedetails.courseContent.length > 0 && (coursedetails.courseContent.map((section,index) => {
                                                                return <details key={index}>
                                                                    {
                                                                        // console.log(section);
                                                                        <summary className="w-full  flex justify-between bg-richblack-700 py-4 pr-8  px-5 "><p className="flex items-center gap-3"> <IoIosArrowDropdownCircle /> {section.sectionName}</p> <p className="text-yellow-50 font-semibold text-lg">{section.subSection.length} Lecure's</p> </summary>
                                                                    }
                                                                    {
                                                                        section.subSection.length >0 && section.subSection.map((subsec,index)=>{
                                                                            return  <p className="w-full flex items-center gap-3 px-6 p-3  bg-richblack-900 " key={index}> <FaVideo />{subsec.title}</p>
                                                                        })
                                                                    }
                                                                </details>
                                                            })
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {/* Second div */}
                                        <div className="w-[32%] bg-caribbeangreen-700">
                                            <p>hee</p>
                                        </div>
                                    </section>
                                    {/* section -3 */}
                                </div>
                            )
                        }
                    </div>
            }
        </>
    )
}
export default Course;




{/* <summary>
                                                            heelo g in summary
                                                        </summary> */}
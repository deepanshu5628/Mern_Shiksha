import { useEffect, useState } from "react";
import { getcoursedetails } from "../services/operations/courseDetailsAPI"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaVideo } from "react-icons/fa6";
import Footer from "../components/common/Footer";
import CartSection from "../components/core/Coursepage/CartSection"
import CourseIntro from "../components/core/Coursepage/CourseIntro";
import Author from "../components/core/Coursepage/Author"
function Course() {
    const parmas = useParams();
    let courseId = parmas.CourseId;
    let [coursedetails, setcoursedetails] = useState(null);
    let [loading, setloading] = useState(false);
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
                    <div className="w-screen h-auto  cursor-default bg-richblack-900 text-white ">
                        {
                            coursedetails !== null && (
                                <div>
                                    {/* section 1 */}
                                    <CourseIntro coursedetails={coursedetails} />

                                    {/* section 2 */}
                                    <section className="md:flex w-full h-auto p-2 pr-5 mt-4 pb-0 bg-richblack-900 justify-around">
                                        {/* first div */}
                                        <div className="w-full md:w-[62%] flex-col mt-4  ">
                                            <div className="border-2 rounded-lg mb-5 border-richblack-300">
                                                <p className="text-4xl font-semibold p-5">What You Will Learn </p>
                                                <p className="px-5  pb-5 text-2xl text-richblack-200">{coursedetails.whatYouWillLearn}</p>
                                            </div>
                                            <div className="">
                                                <p className="text-4xl font-semibold my-4 ">Course Content</p>
                                                <p className="mb-4">{coursedetails.courseContent.length} Section  Lecture</p>
                                                <div className="border-2 border-richblack-500 rounded-md" >
                                                    {
                                                        coursedetails.courseContent.length > 0 && (coursedetails.courseContent.map((section, index) => {
                                                            return <details key={index}>
                                                                {
                                                                    // console.log(section);
                                                                    <summary className="w-full  flex justify-between bg-richblack-700 py-4  pr-8  px-5 "><p className="flex items-center gap-3"> <IoIosArrowDropdownCircle /> {section.sectionName}</p> <p className="text-yellow-50 font-semibold text-lg">{section.subSection.length} Lecure's</p> </summary>
                                                                }
                                                                {
                                                                    section.subSection.length > 0 && section.subSection.map((subsec, index) => {
                                                                        return <p className="w-full flex items-center gap-3 px-6 p-3  bg-richblack-900 " key={index}> <FaVideo />{subsec.title}</p>
                                                                    })
                                                                }
                                                            </details>
                                                        })
                                                        )
                                                    }
                                                </div>
                                            </div>

                                            <Author coursedetails={coursedetails} />
                                        </div>
                                        {/* Second div */}
                                        <CartSection coursedetails={coursedetails}/>
                                    </section>
                                    {/* footer */}
                                    <Footer />
                                </div>
                            )
                        }
                    </div>
            }
        </>
    )
}
export default Course;
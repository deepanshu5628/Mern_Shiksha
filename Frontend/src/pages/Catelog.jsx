import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/common/Footer"
import CourseDiv from "../components/core/Catelog/CourseDiv";
import { fetchcategorydetails } from "../services/operations/PageAndComponentDataAPI";
import EmptyCourse from "../components/core/Catelog/EmptyCourse";
import ReviewSlider from "../components/common/ReviewSlider"
function Catelog() {
    let [loading, setloading] = useState(false);
    let [categorydetails, setcategorydetails] = useState({});
    let [selectedcourses, setselectedcourses] = useState([]);
    let [othercourses, setothercourses] = useState([]);
    let [currpathname, setcurrpathname] = useState("");
    const location = useLocation();
    let pathname = location.pathname.split("/")[2]
    // console.log("path name is ", pathname)

    // console.log("curr path name is ", currpathname)

    let fetchcatdetails = async () => {
        setloading(true);
        try {
            let res = await fetchcategorydetails(pathname)
            if (res.success) {
                setothercourses(res.othercategorycourses);
                setselectedcourses(res.selectedcatergorycourses);
                setcategorydetails(res.categorydetails);
            }
            if (!res.success) {
                toast.error("error occured while fetching from backend");
            }
        } catch (error) {
            toast.error("error while fetching data of category course from backend");
            console.log(error);
            return;
        }
        setloading(false);
    }
    if (pathname !== currpathname) {
        fetchcatdetails();
        setcurrpathname(pathname)
    }
    return (
        <div className="text-white">
            {
                loading ? <div className="loader"></div> : (
                    <div className="w-full h-auto bg-richblack-900">
                        {/* section 1 */}
                        <section className="w-full flex-col bg-richblack-800 p-6 justify-evenly py-10 ">
                            <div className="my-5">
                                <span className="text-richblack-100 text-xl"> Home / Catelog / </span><span className="text-yellow-100 text-2xl">{categorydetails.name}</span>
                            </div>
                            <div className="text-5xl my-5  font-semibold">
                                <i>  {categorydetails.name}</i>
                            </div>
                            <div className="my-5 text-richblack-100 text-lg ">
                                {categorydetails.description}
                            </div>
                        </section>

                        {/* section2  */}
                        <div className=" my-9 cursor-default ">
                            <h1 className="text-4xl font-semibold px-7">Courses To Get You Started</h1>
                            {/* course Slider  */}
                            <div className="flex md:px-10 py-4 mt-7 overflow-auto scrollbar-hide whitespace-nowrap">
                                {
                                    selectedcourses.length > 0 && selectedcourses.map((course, index) => {
                                        return <div className=" bg-richblack-800  cursor-pointer rounded-lg  m-4 max-h-64 min-h-64 min-w-64 max-w-64 hover:border-yellow-200 hover:border-2" key={index}>
                                            <CourseDiv course={course} />
                                        </div>
                                    })
                                }
                                {
                                    selectedcourses.length === 0 && <div className=" flex  w-[100%]    justify-center items-center py-5 my-3 text-4xl ">
                                        <EmptyCourse />
                                    </div>
                                }
                            </div>
                            {/* hidescrollbar */}
                            <div className="w-full h-7 disabled: relative bottom-6  z-0 bg-richblack-900">
                            </div>
                        </div>

                        {/* section 3 course you  may like  */}
                        <div className=" my-9 cursor-default ">
                            <h1 className="text-4xl font-semibold px-7">Courses You May Like</h1>
                            {/* course Slider  */}
                            <div className="flex md:px-10 py-4 mt-7 overflow-auto scrollbar-hide whitespace-nowrap">
                                {
                                    othercourses.length > 0 && othercourses.map((course, index) => {
                                        return <div className=" bg-richblack-800  cursor-pointer rounded-lg  m-4 max-h-64 min-h-64 min-w-64 max-w-64 hover:border-yellow-200 hover:border-2" key={index}>
                                            <CourseDiv course={course} />
                                        </div>
                                    })
                                }
                                {
                                    othercourses.length === 0 && <div className=" flex  w-[100%]    justify-center items-center py-5 my-3 text-4xl ">
                                        <EmptyCourse />
                                    </div>
                                }
                            </div>
                            {/* hidescrollbar */}
                            <div className="w-full h-7 disabled: relative bottom-6  z-0 bg-richblack-900">
                            </div>
                        </div>
                        <div className="px-8">
                            <div className="text-4xl font-semibold text-white text-center mt-12 px-2">
                                <p className="hidden md:block">Review from others learners</p>
                                <p className="md:hidden">Review's</p>
                                <ReviewSlider />
                                <div className='relative bottom-5 z-50 w-full h-5 bg-richblack-900'></div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                )
            }
        </div>
    )
}

export default Catelog;
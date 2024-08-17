import { useSelector } from "react-redux";
import { IoTrashBinOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import {toast} from "react-toastify"
import { userCourseDetails } from "../../../services/operations/courseDetailsAPI"
import { useNavigate } from "react-router-dom";
function EnrolledCourses() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  let [currusercourses, setcurrusercourses] = useState([]);
  const [loading, setloading] = useState(false);
  // console.log(currusercourses)

  // fetch curr user courses
  let currusercor = async () => {
    let res = await userCourseDetails(token);
    // console.log(res);
    if (res.success) {
      setcurrusercourses(res.coursedetails);
    }
    if(!res.success){
      toast.error(res.message);
    }
  }
  useEffect(() => {
    setloading(true);
    currusercor();
    setloading(false);
  }, [])

  // fxn to naviagate to view COurse
  function viewcourse(id) {
    // console.log("button is cliked", id)
    navigate(`/view-course/:${id}`)
  }


  return (
    <>
      {
        loading ? <div className="loader"></div> : (
          <div className="flex flex-col text-richblack-5 w-[100%]  items-center h-max  gap-6  ">
            <section className=" bg-richblack-800 px-4 md:pl-10 md:pb-14  rounded-md my-12   md:w-[70%] h-[75%] flex-col justify-between items-center">
              <h1 className="text-xl md:text-4xl relative my-10  font-semibold text-richblack-25">
                Enrolled Courses
              </h1>
              {currusercourses.length === 0 ? (
                <div className="mt-5 flex-col text-center  pb-2  text-xl font-semibold">
                  <div className="text-center ">
                    <p>You have not enrolled in any course yet.</p>{" "}
                  </div>
                  <div className="text-9xl mt-10 flex justify-center">
                    <IoTrashBinOutline />
                  </div>
                </div>
              ) : (
                // pending
                < div className="w-[95%]   cursor-pointer ">
                  {
                    currusercourses.map((course, index) => {
                      return <div
                        onClick={() => viewcourse(course._id)}
                        className=" flex flex-col lg:flex-row justify-evenly bg-richblack-900 my-4 rounded-lg border-t-2 border-richblack-300"
                        key={index}>
                        {/* image div */}
                        <div className="  w-full  bg-pink-200 md:min-w-[40%] ">
                          <img src={course.thumbnail} className="h-full py-1 w-full rounded-lg" alt="asf" />
                        </div>
                        {/* info div */}
                        <div className="  md:text-3xl flex  py-3   items-center">
                          <p className="font-semibold text-base sm:text-sm ">{course.courseName}</p>
                          {/* <p>hsdfljasfdljsadflroerm  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla rem dignissimos, mollitia eius optio error eum et repudiandae corporis quisquam? Distinctio saepe laboriosam, nemo voluptatibus temporibus ex accusantium. Dignissimos, ratione!</p> */}
                          {/* <p className="mt-4 text-richblack-100">{course.category.name}</p> */}
                        </div>
                      </div>
                    })
                  }
                </div>
              )}
            </section>
          </div>
        )}
    </>
  );
}

export default EnrolledCourses;

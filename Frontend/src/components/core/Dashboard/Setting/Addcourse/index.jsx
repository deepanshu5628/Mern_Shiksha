import { useDispatch, useSelector } from "react-redux";
import Rendersteps from "./Rendersteps";
import { IoSparklesOutline } from "react-icons/io5";
import { useEffect } from "react";
import { getcoursedetails } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../redux/Slices/courseSlice";
function AddCourse() {
  const dispatch = useDispatch();
  const { course, step } = useSelector((state) => state.course);

  //---------------------------------- special logic for rerender probkem ------------------------
  if (course != null) {
    const fetchcoursedetails = async () => {
      let res = await getcoursedetails(course._id);
      dispatch(setCourse(res.coursedetails));
    };
    if (step < 6) {
      fetchcoursedetails();
    }
  }
  // ----------------------------------------------------------------------------------------
  return (
    <div className="flex text-richblack-5  justify-center  my-10  w-[100%]">
      <div className=" min-w-[49%]">
        <h1 className="text-4xl  mb-10  flex  font-semibold text-richblack-25">
          Add Course
        </h1>

        <div className="">
          <Rendersteps />
        </div>
      </div>
      <div
        className="bg-richblack-800 h-fit
       p-8 rounded-lg w-[40%] mt-10"
      >
        <div className="flex  gap-5">
          <IoSparklesOutline className="text-yellow-25 text-3xl items-center" />
          <h3 className="mb-6 font-bold text-2xl"> Code Upload Tips </h3>
        </div>

        <ul>
          <li>Set the Course Price option or make it free</li>
          <li>Standard size for the course thumbnail is 1024 x 576</li>
          <li>Video Section controls the course overview video </li>
          <li>Set the course price option or make it free</li>
          <li>Standard size for the course Thumbnail is 1024 x 576</li>
          <li>Video section controls the course overview video</li>
          <li>Set the course price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024 x 576</li>
        </ul>
      </div>
    </div>
  );
}

export default AddCourse;

import { useDispatch, useSelector } from "react-redux";
import Rendersteps from "./Rendersteps";
import { IoSparklesOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getcoursedetails } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEdit } from "../../../../redux/Slices/courseSlice";
import { useLocation } from "react-router-dom";
function AddCourse() {
  const dispatch = useDispatch();
  const { course, edit, step } = useSelector((state) => state.course);
  const location = useLocation();
  // console.log("loca",location.pathname);
  // console.log("in index.jsx",course);



  return (
    <div className="flex flex-col md:flex-row text-richblack-5  md:justify-center  my-10  w-[100%]">
      <div className=" md:min-w-[49%] ">
        <h1 className="text-4xl  mb-10  flex  font-semibold text-richblack-25">
          Add Course
        </h1>

        <div className="">
          <Rendersteps />
        </div>
      </div>
      <div className="bg-richblack-800 h-fit p-8 rounded-lg w-full md:w-[40%] mt-10">
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

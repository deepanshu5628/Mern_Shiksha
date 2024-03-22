import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationform from "./CourseInformation/CourseInformationform";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import { useEffect } from "react";
import {getcoursedetails} from "../../../../../services/operations/courseDetailsAPI"
import { toast } from "react-toastify";
function Rendersteps() {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Course Publish",
    },
  ];

  return (
    <>
    <div className="bg-richblack-800 h-auto py-6 rounded-md px-8 w-[85%] flex justify-between items-center">
      <div className="flex w-full justify-around text-center ">
        {steps.map((element,index) => (
          <div key={index} className="flex-col items-center justify-center">
            <div>
              <p
                className={` w-6 mx-10 text-center  ${
                  step === element.id
                    ? " bg-yellow-600 font-semibold"
                    : "bg-richblack-500"
                } rounded-full`}
              >
                {step > element.id ? (
                  <FaCheck className="items-center bg-yellow-600 rounded-full my-2 text-yellow-25 w-full" />
                ) : (
                  `${element.id}`
                )}
              </p>{" "}
            </div>
            <p>{element.title}</p>
          </div>
        ))}
      </div>
    </div>
    {/* input form  */}
    <div className="w-[85%] bg-richblack-800 h-auto py-6 rounded-md px-8 items-center">
        {
          step==1  &&  <CourseInformationform/>
        }
        {
          step==2  &&  <CourseBuilderForm/>
        }
      </div>
    </>
  );
}

export default Rendersteps;

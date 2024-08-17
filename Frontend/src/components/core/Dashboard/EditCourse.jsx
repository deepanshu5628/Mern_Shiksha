import { useLocation, useNavigate, useParams } from "react-router-dom";
import Rendersteps from "./Addcourse/Rendersteps";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setEdit } from "../../../redux/Slices/courseSlice";
import { setCourse } from "../../../redux/Slices/courseSlice";
import { getcoursedetails } from "../../../services/operations/courseDetailsAPI";
function EditCourse() {
    const dispatch = useDispatch();
    let  {state}  = useLocation();
    const { course } = useSelector((state) => state.course);
    const [loading, setloading] = useState(false);
    // const id = state.id;
    // console.log("state id ",state.data);


    // fetch course detials
    const fetchcoursedetails = async () => {
        setloading(true);
        let res = await getcoursedetails(state.data);
        // console.log(res);
        if (res.success) {
            dispatch(setCourse(res.coursedetails));
            dispatch(setEdit(true));
        }
        setloading(false);
    };

    useEffect(() => {
        if(state.data){
            fetchcoursedetails();
        }
    }, [])
    return (
        <div className="w-full my-6">
            {
                loading ? <div className="loader"></div> :
                    <div className="flex  w-full justify-center items-center">
                        <div className="text-white w-full md:w-[65%] md:pl-9 flex-col  justify-center items-center  bg-richblack-800">
                            <h1 className="text-4xl px-8 my-6  flex  font-semibold text-richblack-25">
                                Edit Course
                            </h1>
                            {course ? (
                                <Rendersteps />
                            ) : (
                                <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                                    Course not found
                                </p>
                            )}
                        </div>
                    </div>
            }
        </div>
    )
}

export default EditCourse;
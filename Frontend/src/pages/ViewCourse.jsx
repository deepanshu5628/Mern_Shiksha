import { useDispatch, useSelector } from "react-redux";
import VideoSidebar from "../components/core/ViewCourse/VideoSidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { getcoursedetails } from "../services/operations/courseDetailsAPI";
import { useEffect, useState } from "react";
import {toast} from "react-toastify"
import { setcourseEntireData, setcourseSectionData } from "../redux/Slices/ViewCourseSlice";
function ViewCourse() {
    const dispatch=useDispatch();
    const [reviewmodal, setreviewmodal] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const [loading, setloading] = useState(false);
    let location = useLocation();
    let id = location.pathname.split(":")[1];
    // console.log(id)
    async function fetchcoursedetail() {
        let res = await getcoursedetails(id)
        // console.log(res);
        if (res.success) {
            dispatch(setcourseEntireData(res.coursedetails));
            dispatch(setcourseSectionData(res.coursedetails.courseContent));
        }
        if (!res.success) {
            toast.error(res.message);
        }
    }

    useEffect(() => {
        setloading(true);
        fetchcoursedetail();
        setloading(false);
    }, []);
    return (
        <>
            {
                loading ? <div className="loader"></div> : <>
                    <div className={` ${reviewmodal ?"opacity-35":"opacity-100"} flex`}>
                        <VideoSidebar className="w-[20%]" setreviewmodal={setreviewmodal} />
                        <div className="w-[80%]">
                            <Outlet  />
                        </div>
                    </div>
                    {
                        reviewmodal && <CourseReviewModal setreviewmodal={setreviewmodal} />
                    }
                </>
            }
        </>
    )
}

export default ViewCourse;
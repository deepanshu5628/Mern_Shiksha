import { FaVideo } from "react-icons/fa6";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { setvideokaurl } from "../../../redux/Slices/ViewCourseSlice";
import { useDispatch,useSelector } from "react-redux";
function VideoSidebarsmaal({ setreviewmodal }){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { courseSectionData, courseEntireData } = useSelector((state) => state.viewCourse);
    // console.log("course section data", courseSectionData)
    // console.log("course entire data ", courseEntireData)

    // fxn to set video url 
    function setvideourl(url) {
        dispatch(setvideokaurl(url));
    }
    return (
        <div className="md:hideen  relative top-14 text-white  bg-richblack-800 h-auto w-full p-2">
        <div className="w-full flex my-2 mt-3 cursor-default  justify-between  text-xl">
            <button onClick={() => navigate(-1)} className="text-4xl"><IoArrowBackCircle /></button>
            <button className="md:text-base lg:text-lg bg-yellow-100 md:p-1 lg:p-2 rounded-md text-black" onClick={() => setreviewmodal(true)}>Add Review</button>
        </div>
        <div className="font-semibold text-2xl my-2 cursor-default">
            <p>{courseEntireData.courseName}</p>
        </div>
        <hr />
        <div className="cursor-default">
            {
                courseSectionData.map((section, index) => {
                    return <details className="p-2 cursor-pointer" key={index}>
                        <summary className="text-xl">{section.sectionName}</summary>
                        {
                            section.subSection.map((subsection, index) => {
                                return <p
                                    onClick={() => setvideourl(subsection.videoUrl)}
                                    className="flex items-center gap-2 p-2 text-lg "
                                    key={index}> <FaVideo />{subsection.title}
                                </p>
                            })
                        }
                    </details>
                })
            }
        </div>
    </div>
    )
}

export default VideoSidebarsmaal;
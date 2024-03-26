import {useNavigate} from "react-router-dom"
function CourseDiv({course}) {
    const navigate=useNavigate();
    function courseclick(id){
        navigate(`/Course/${id}`);
    }
    return (
        <div onClick={()=>courseclick(course._id)} className="p-2 py-4 font-semibold flex-col h-full">
            <img src={course.thumbnail} className="w-[99%] min-h-[70%] rounded-lg  " alt="Thubmnail" />
            <p className=" my-2 text-xl">{course.courseName}</p>
            <p className="">Rs:{course.price}</p>
        </div>
    )
}

export default CourseDiv;
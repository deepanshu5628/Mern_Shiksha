import { element, func } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {deleteSection} from "../../../../../../services/operations/courseDetailsAPI"
import { FaCaretDown } from "react-icons/fa";
import {toast} from "react-toastify"
import { useState } from "react";
import {setCourse} from "../../../../../../redux/Slices/courseSlice"

function NestedView({editSectionNamefxn}) {
    const dispatch=useDispatch();
    const {token}=useSelector((state)=>state.auth);
    const [loading,setloading]=useState(false);
  let { course } = useSelector((state) => state.course);
  function editfxn(id,sectionName) {
    editSectionNamefxn(id,sectionName);
  }
  async function deletefxn(id) {
    setloading(true);
    try {
        let res=await deleteSection({courseId:course._id,sectionId:id},token);
        if(res.success){
            toast.success(res.message);
            dispatch(setCourse(res.updatedcourse));
            localStorage.setItem("course", JSON.stringify(res.updatedcourse));
        }
        if(!res.success){
            toast.error("error");
        }
    } catch (error) {
        toast.error("error in deleting the Section");
        console.log(error);
        setloading(false);
        return ;
    }
    
    setloading(false);
  }
  return (
    <div className="bg-richblack-700 rounded-lg p-3 my-2">
      {course.courseContent.map((element, index) => {
        return (
          <div
            key={element._id}
            className="flex justify-between items-center gap-3 m-2 py-2"
          >
            <div className="flex items-center gap-3">
              <RxDropdownMenu />
              <p>{element.sectionName}</p>
            </div>
            <div className="flex gap-2 items-center">
              <MdEdit onClick={() => editfxn(element._id,element.sectionName)} />
              <MdDelete onClick={() => deletefxn(element._id)} />
              <span>|</span>
              <FaCaretDown />
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default NestedView;

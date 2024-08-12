import { element, func } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deleteSection,DeleteSubSection,getcoursedetails } from "../../../../../services/operations/courseDetailsAPI";
import { FaCaretDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";
import { setCourse } from "../../../../../redux/Slices/courseSlice";
import SubSectionModal from "./SubSectionModal";

function NestedView({ editSectionNamefxn }) {
  // States to keep track of mode of modal [add, view, edit]
  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)


  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setloading] = useState(false);
  let { course } = useSelector((state) => state.course);
  function editfxn(id, sectionName) {
    editSectionNamefxn(id, sectionName);
  }


  // deltet Section
  async function deletefxn(id) {
    setloading(true);
    try {
      let res = await deleteSection(
        { courseId: course._id, sectionId: id },
        token
      );
      if (res.success) {
        toast.success(res.message);
        dispatch(setCourse(res.updatedcourse));
        localStorage.setItem("course", JSON.stringify(res.updatedcourse));
      }
      if (!res.success) {
        toast.error("error");
      }
    } catch (error) {
      toast.error("error in deleting the Section");
      console.log(error);
      setloading(false);
      return;
    }
    setloading(false);
  }
  // delte the Subsection
  async function DelSubSection(subSectionId, sectionId) {
    // console.log("del btn is clicked");
    setloading(true);
    try {
      let res = await DeleteSubSection(
        { subSectionId:subSectionId,sectionId :sectionId },
        token
      );
      if (res.success) {
        const fetchcoursedetails = async () => {
          let res = await getcoursedetails(course._id);
          dispatch(setCourse(res.coursedetails));
      };
      fetchcoursedetails();
        toast.success(res.message);
        

    }
      if (!res.success) {
        toast.error("error");
      }
    } catch (error) {
    toast.error("error in deleting the Section");
    console.log(error);
    setloading(false);
    return;
  }

  setloading(false);


}
// console.log("course value in Nested view",course);
return (
  <div>
    <div className="bg-richblack-700 rounded-lg p-3 my-2">
      {/* main div  */}
      {course.courseContent.map((element, index) => {
        // console.log(element);
        return (
          <details
            key={element._id}
            className="flex justify-between items-center gap-3 m-2 py-2"
          >
            <summary className="flex justify-between items-center gap-3">
              <div className="flex items-center gap-3">
                <RxDropdownMenu />
                <p>{element.sectionName}</p>
              </div>
              <div onClick={(e)=>e.stopPropagation()} className="flex gap-2  items-center">
                <MdEdit
                  onClick={() => editfxn(element._id, element.sectionName)}
                />
                <MdDelete onClick={() => deletefxn(element._id)} />
                <span>|</span>
                <FaCaretDown />
              </div>
            </summary>
            {/* subloopo */}
            <div className="w-90% bg-richblack-800 p-2 my-2 rounded-lg">
              {
                element !== null && element.subSection && element.subSection.length > 0 && (
                  element.subSection.map((section, index) => {
                    return <div key={index} className="flex bg-richblack-700 rounded-lg  items-center justify-between px-3 my-2">
                      <p>{section.title}</p>
                      <MdDelete onClick={() => DelSubSection(section._id, element._id)} />
                    </div>
                  })
                )
              }
              {<button
                onClick={() => setAddSubsection(element._id)}
                className="w-auto  text-yellow-50">Add Lecture</button>}
            </div>
          </details>
        );
      })}
    </div>
    {
      addSubSection && <SubSectionModal add={true} sectionId={addSubSection} fxn1={setAddSubsection} />
    }
    {
      viewSubSection && <SubSectionModal view={true} />
    }
    {
      editSubSection && <SubSectionModal edit={true} />
    }
  </div>
);
}
export default NestedView;

import { CiCirclePlus } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import {
  setCourse,
  setEdit,
  setStep,
} from "../../../../../../redux/Slices/courseSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createSection,
  updateSection,
} from "../../../../../../services/operations/courseDetailsAPI";
import { toast } from "react-toastify";
import NestedView from "./NestedView";
import { func } from "prop-types";

function CourseBuilderForm() {
  console.log("course builder.jsx page");

  const dispatch = useDispatch();
  let [Loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  let { step, course } = useSelector((state) => state.course);
  const [editSectionName, seteditSectionName] = useState(null);
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function sectionformhandler(data) {
    if (!editSectionName) {
      setLoading(true);
      // console.log(data.sectionName);
      let finaldata = { sectionName: data.sectionName, courseId: course._id };
      try {
        let res = await createSection(finaldata, token);
        if (res.success) {
          toast.success(res.message);
          dispatch(setCourse(res.updatedcourse));
          localStorage.setItem("course", JSON.stringify(res.updatedcourse));
          setValue("sectionName", "");
        }
        if (!res.success) {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("error while creating A course");
        console.log(error);
        setLoading(false);
        return;
      }
      setLoading(false);
    }

    if (editSectionName) {
      setLoading(true);
      let finaldata = {
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      };
      try {
        let res = await updateSection(finaldata, token);
        if (res.success) {
          toast.success(res.message);
          dispatch(setCourse(res.updatedcourse));
          localStorage.setItem("course", JSON.stringify(res.updatedcourse));
          setValue("sectionName", "");
        }
        if (!res.success) {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("error while creating A course");
        console.log(error);
        setLoading(false);
        return;
      }
      setLoading(false);
    }
  }

  // EDIT SECTION NAME
  function editSectionNamefxn(id, sectionName) {
    seteditSectionName(id);
    setValue("sectionName", sectionName);
  }

  // cancel button fucntion
  async function canceleditbtn() {
    seteditSectionName(null);
    setValue("sectionName", "");
  }

  // back btn function
  function backbtnfxn() {
    dispatch(setStep(1));
    dispatch(setEdit(true));
  }

  useEffect(() => {
    if ( course!==null&& course.courseContent.length === 0) {
      seteditSectionName(null);
    }
    
  }, []);
  return (
    <div>
      {Loading ? (
        <div className="loader "></div>
      ) : (
        <div className="flex-col">
          <div className="text-white ">
            <h1 className="font-semibold text-2xl">Course Builder</h1>
            <br />
            {/* form div */}
            <form onSubmit={handleSubmit(sectionformhandler)}>
              <div>
                <label htmlFor="secname">Section Name</label>
                <input
                  type="text"
                  placeholder="Enter Section Name"
                  id="secname"
                  {...register("sectionName", { required: { value: true } })}
                  className="w-full bg-richblack-700 rounded-md p-1 text-richblack-25"
                />
                {errors.sectionName && (
                  <span className="text-yellow-50 text-sm">
                    Section Name is Required
                  </span>
                )}
              </div>
              {/* if editsecetionname is false */}
              {!editSectionName && (
                <button
                  type="submit"
                  className="text-center text-[13px] px-6 py-3 rounded-md 
             font-bold text-black bg-yellow-50 hover:scale-95 transition-all 
             duration-200 my-3"
                >
                  <div className="flex items-center gap-2">
                    <p>Create Section</p>
                    <CiCirclePlus className="text-xl items-center" />
                  </div>
                </button>
              )}
              {editSectionName && (
                <div className="flex gap-2 items-center ">
                  <button
                    type="submit"
                    className="text-center text-[13px] px-6 py-3 rounded-md 
             font-bold text-black bg-yellow-50 hover:scale-95 transition-all 
             duration-200 my-3"
                  >
                    <div className="flex items-center gap-2">
                      <p>Edit Section Name</p>
                      <CiCirclePlus className="text-xl items-center" />
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={canceleditbtn}
                    className="bg-richblack-700 p-2 rounded-lg text-xs"
                  >
                    Cancel Edit
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* nested view div */}
          { course !==null && course.courseContent.length > 0 && (
            <NestedView  editSectionNamefxn={editSectionNamefxn} />
          )}
          {/* buttons div */}
          <div className="flex  justify-end">
            <div className=" flex gap-8">
              <button
                className="text-center text-[13px] px-6 py-3 rounded-md 
             font-bold text-black bg-richblack-400 hover:scale-95 transition-all 
             duration-200 my-3"
                onClick={backbtnfxn}
              >
                Back
              </button>
              <button
                className="text-center text-[13px] px-6 py-3 rounded-md 
             font-bold text-black bg-yellow-50 hover:scale-95 transition-all 
             duration-200 my-3"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseBuilderForm;

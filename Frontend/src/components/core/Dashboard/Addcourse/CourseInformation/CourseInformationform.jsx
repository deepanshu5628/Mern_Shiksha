import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { apiconnector } from "../../../../../services/apiconnector";
import { categories } from "../../../../../services/apis";
import { addCourseDetails, updateCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCourse, setStep } from "../../../../../redux/Slices/courseSlice";
import { getcoursedetails } from "../../../../../services/operations/courseDetailsAPI";

function CourseInformationform() {
  const { edit, course, step } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [courseCategories, setCourseCategories] = useState([]);
  // console.log(course);
  // console.log(edit);


  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  //   fetch category details  from bakend using useeffect
  useEffect(() => {
    const getCategories = async () => {
      setloading(true);
      let cat = await apiconnector(
        "GET",
        categories.CATEGORIES_API_SHOWALLCATEGORIES
      );
      let category = cat.allcategory;
      setCourseCategories(category);
      setloading(false);
    };
    getCategories();

    // if value of edit is true then ;
    if (edit) {
      setValue("title", course.courseName);
      setValue("description", course.courseDescription);
      setValue("price", course.price);
      setValue("category", course.category.name);
      setValue("benifits", course.whatYouWillLearn);
    }
  }, []);


  function formsubmithandler(data) {
    if (!edit) {
      let formdata = new FormData();
      formdata.append("courseName", data.title);
      formdata.append("courseDescription", data.description);
      formdata.append("price", data.price);
      formdata.append("thumbnail", data.thumbnail[0]);
      formdata.append("whatYouWillLearn", data.benifits);
      formdata.append("category", data.category);

      // api call to backend
      let CreateCourse = async () => {
        setloading(true);
        try {
          let res = await addCourseDetails(formdata, token);
          // console.log(res);
          if (res.data.success) {
            toast.success(res.data.message);
            dispatch(setStep(2));
            localStorage.setItem("step", JSON.stringify("2"));
            dispatch(setCourse(res.data.updatedcourse));
            localStorage.setItem(
              "course",
              JSON.stringify(res.data.updatedcourse)
            );
          }
          if (!res.data.success) {
            toast.error(res.data.message);
          }
        } catch (error) {
          toast.error("error while creating A course");
          console.log(error);
          setloading(false);
          return;
        }
        setloading(false);
      };
      CreateCourse();
    }

    // if the edit mode is on 
    if (edit) {
      let currval = getValues();
      // console.log(currval.title)
      // console.log("form is in the mode of edit on ");
      let formdata = new FormData();
      formdata.append("courseId", course._id);
      // if(currval.title !=course.courseName){
      formdata.append("courseName", currval.title)
      // }
      // if(currval.description!==course.description){
      formdata.append("courseDescription", currval.description)
      // }
      // if(currval.price!==course.price){
      formdata.append("price", currval.price);
      // }
      // if(currval.category!==course.category){
      formdata.append("category", currval.category);
      // }
      // if(currval.benifits!==course.whatYouWillLearn){
      formdata.append("whatYouWillLearn", currval.benifits);
      // }

      // api call to backend
      const updateCourse = async () => {
        setloading(true);
        try {
          let res = await updateCourseDetails(formdata, token);

          // console.log(res);
          if (res.data.success) {
       
            toast.success(res.data.message);
            dispatch(setStep(2));
            localStorage.setItem("step", JSON.stringify("2"));
           
            dispatch(setCourse(res.data.updatedcourse));
            localStorage.setItem(
              "course",
              JSON.stringify(res.data.updatedcourse)
            );
          }
          if (!res.data.success) {
            toast.error(res.data.message);
          }
        } catch (error) {
          toast.error("error while creating A course");
          console.log(error);
          setloading(false);
          return;
        }
        setloading(false);
      }
      updateCourse();
    }
  }

  // ---------------------------if the  course is in edit stage---------------------------
  function withoutsavefxn() {
    dispatch(setStep(2));
  }
 
  return (
    <div className="w-full flex-col justify-between  bg-richblack-800">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <form className="flex-col" onSubmit={handleSubmit(formsubmithandler)}>
          {/* course title */}
          <div className="">
            <label htmlFor="title">Course Title </label>
            <br />
            <input
              type="text"
              id="title"
              {...register("title", { required: { value: true } })}
              className="w-full p-1 rounded-md bg-richblack-700 text-richblack-25"
            />
            {errors.title && (
              <span className="text-yellow-25">
                <p>Required</p>
              </span>
            )}
          </div>
          {/* description */}
          <div className="">
            <label htmlFor="description">Course Short Description</label>
            <br />
            <input
              type="text"
              id="description"
              {...register("description", { required: { value: true } })}
              className="w-full p-1 rounded-md bg-richblack-700 text-richblack-25"
            />
            {errors.description && (
              <span className="text-yellow-25">Required</span>
            )}
          </div>
          {/* Course price */}
          <div className="">
            <label htmlFor="price">Course Price</label>
            <br />
            <input
              type="number"
              id="price"
              {...register("price", { required: { value: true } })}
              className="w-full p-1 rounded-md bg-richblack-700 text-richblack-25"
            />
            {errors.price && <span className="text-yellow-25">Required</span>}
          </div>
          {/* course Category */}
          <div>
            <label htmlFor="category">Choose Category</label>
            <select
              id="category"
              defaultValue=""
              name="category"
              {...register("category", { required: { value: true } })}
              className="w-full p-1 rounded-md bg-richblack-700 text-richblack-25"
            >
              {errors.category && (
                <span className="text-yellow-25">Required</span>
              )}
              <option value="" disabled>
                Choose A Category
              </option>
              {!loading &&
                courseCategories.map((element, index) => (
                  <option
                    key={index}
                    className="w-full p-1 rounded-md bg-richblack-700 text-richblack-25"
                    value={element.name}
                  >
                    {element.name}
                  </option>
                ))}
            </select>
          </div>
          {/* course thumbnail */}
          <div>
            <label htmlFor="thumbnail">Course Thumbnail</label>
            <br />
            <input
              type="file"
              name="thumbnail"
              disabled={edit}
              required={!edit}
              {...register("thumbnail", `${edit ? { required: { value: false } } : { required: { value: true } }}`)}
              // {...register("thumbnail",{ required: { value: true } } )}
              className="w-full  p-1 rounded-md bg-richblack-700 text-richblack-25"

            />
            {errors.thumbnail && (
              <span className="text-yellow-25">Required</span>
            )}
            {/* pending */}
            {/* <img src={File} alt="" /> */}
          </div>
          {/* benifits of course */}
          <div>
            <label htmlFor="benifits">Course Benifits</label>
            <textarea
              name="benifits"
              id="benifits"
              {...register("benifits", { required: { value: true } })}
              className="w-full h-28 p-1 rounded-md bg-richblack-700 text-richblack-25"
            ></textarea>
            {errors.benifits && (
              <span className="text-yellow-25">Required</span>
            )}
          </div>
          {/* requirements / instruction */}
          {/* <div>
            <label htmlFor="requirments">Requirments/Instruction</label>
            <br />
            <input
              type="text"
              id="requirments"
              className="w-full p-1 rounded-md bg-richblack-700 text-richblack-25"
            />
          </div> */}
          {/* buttons */}
          <div className="text-white my-4 flex justify-end gap-8">
            {edit && (
              <button
                type="button"
                onClick={withoutsavefxn}
                className="text-center text-[13px] px-6 py-3 rounded-md 
            font-bold text-black bg-richblack-400  hover:scale-95 transition-all 
            duration-200"
              >
                Continue Without Saving
              </button>
            )}
            <button
              type="submit"
              className="text-center text-[13px] px-6 py-3 rounded-md 
             font-bold text-black bg-yellow-50  hover:scale-95 transition-all 
             duration-200"
            >
              {edit ? "Update Changes" : "Next"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CourseInformationform;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEdit, setStep } from "../../../../../redux/Slices/courseSlice";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { json, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { publishCourse } from "../../../../../services/operations/courseDetailsAPI";
function PublishCourse() {
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm();
    // console.log(course);

    // form submit handler
    async function fromhandler(data) {
        if ((course.status === "Published" && getValues("public") === true) || (course.status === "Draft" && getValues("public") === false)) {
            navigate("/dashboard/my-courses");
            dispatch(setCourse(null));
            dispatch(setStep(1));
            dispatch(setEdit(false));
            localStorage.removeItem("course");
            localStorage.removeItem("step");
            localStorage.removeItem("edit");
            return;
        }

        const coursestatus = getValues("public") ? "Published" : "Draft"
        const formdata = {
            status: coursestatus,
            courseId: course._id,
            instructorId: course.Instructor._id,
        }

        setloading(true);
        let res = await publishCourse(formdata, token);
        if (res.success) {
            toast.success("Successful")
            dispatch(setCourse(res.updatedcourse));
            localStorage.setItem("course", JSON.stringify(res.updatedcourse));
            setloading(false);
            navigate("/dashboard/my-courses")
            dispatch(setCourse(null));
            dispatch(setStep(1));
            dispatch(setEdit(false));
            localStorage.removeItem("course");
            localStorage.removeItem("step");
            localStorage.removeItem("edit");

        }
        if (!res.success) {
            toast.error("error occured");
            setloading(false);
        }
    }


    // back btn fxn
    function backbtn() {
        dispatch(setStep(2));
    }

    useEffect(() => {
        if (course.status === "Published") {
            setValue("public", true)
        }
    }, [])

    return (
        <div>
            {
                loading ? <div className="loader"></div> :
                    <div>
                        <h1 className="text-2xl font-semibold">Publish Settings</h1>
                        <form onSubmit={handleSubmit(fromhandler)} >
                            <div className="flex gap-2 items-center text-md my-4 ml-2">
                                <input type="checkbox"
                                    id="checkbox"
                                    className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                                    {...register("public")}
                                />
                                <label htmlFor="checkbox">Make this Course As Public</label>
                            </div>
                            <div className="flex  justify-end">
                                <div className="flex-col items-center  ">
                                    <button
                                        disabled={loading}
                                        type="button"
                                        onClick={backbtn}
                                        className="text-center text-[13px] px-6 py-3 rounded-md 
                                font-bold text-black bg-richblack-400 hover:scale-95 transition-all 
                                duration-200 m-3">Back</button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="text-center text-[13px] px-4 py-3 rounded-md 
                                font-bold text-black bg-yellow-50 hover:scale-95 transition-all 
                                duration-200 m-3">Save Changes</button>
                                </div>
                            </div>
                        </form>
                    </div>
            }
        </div>
    )
}
export default PublishCourse;
import { useForm } from "react-hook-form";
import { createSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { setStep, setCourse } from "../../../../../redux/Slices/courseSlice";
import { getcoursedetails } from "../../../../../services/operations/courseDetailsAPI";
function SubSectionModal({ add = false, edit = false, view = false, sectionId ,fxn1}) {
    const { register, setValue, getValues, handleSubmit, formState: { errors } } = useForm();
    let [loading, setloading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();


    // form submit handler
    function subsectionformhandler(data) { 
        if (!edit && add) {
            let formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("videoFile", data.videoFile[0]);
            formData.append("sectionId", sectionId);
            // make a call to backend
            let createSection = async () => {
                setloading(true);
                try {
                    let res = await createSubSection(formData, token);
                    console.log("create subsection respoce ", res);
                    if (res.success) {
                        const fetchcoursedetails = async () => {
                            let res = await getcoursedetails(course._id);
                            dispatch(setCourse(res.coursedetails));
                        };
                        fetchcoursedetails();
                        toast.success(res.message);
                        dispatch(setStep(2));
                        localStorage.setItem("step", JSON.stringify("2"));
                        fxn1(null);

                    }
                    if (!res.success) {
                        toast.error(res.message);
                    }
                } catch (error) {
                    toast.error("error while creating A SubSection");
                    console.log(error);
                    setloading(false);
                    return;
                }
                setloading(false)
            }
            createSection();
        }
    }

    // close the modal
    function closemodal(){
        fxn1(null);
    }

    


    return (
        <div>
            {
                loading ? <div className="loader"></div> :
                    <div className="bg-richblack-700 p-2 rounded-xl flex-col justify-evenly">
                        <div className="flex items-center justify-between p-2">
                            <h1 className="text-2xl font-semibold "> Add Section</h1>
                            <ImCross onClick={closemodal} />
                        </div>
                        <form onSubmit={handleSubmit(subsectionformhandler)} className="flex-col gap-3 p-2 my-2" >
                            {/* edit field */}
                            <div>
                                <label htmlFor="videofile">Lecture Video</label>
                                <br />
                                <input type="file"
                                    id="videofile"
                                    accept="video/*"
                                    {...register("videoFile", { required: { value: true } })}
                                    placeholder="Select the Lecture" />
                                    <br />
                                    <span className="text-sm text-yellow-50">max size 5mb mp4 supported</span>
                                {
                                    errors.videoFile && ( 
                                        
                                        <div className="text-yellow-50">Required</div>
                                    )
                                }
                            </div>
                            <div>
                                <label htmlFor="title">Title</label>
                                <br />
                                <input type="text"
                                    id="title"
                                    className="w-full bg-richblack-800 rounded-md p-1 text-richblack-25"
                                    placeholder="Enter Lecture Name"
                                    {...register("title", { required: { value: true } })}
                                />
                                {
                                    errors.title && (
                                        <span className="text-yellow-50">Required</span>
                                    )
                                }
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <br />
                                <input type="text"
                                    id="description"
                                    className="w-full bg-richblack-800 rounded-md p-1 text-richblack-25"
                                    placeholder="Enter Lecture Description"
                                    {...register("description", { required: { value: true } })}
                                />
                                {
                                    errors.title && (
                                        <span className="text-yellow-50">Required</span>
                                    )
                                }
                            </div>
                            {
                                add && <button className="p-2 bg-yellow-100 rounded-md my-2  text-black" type="submit">Save</button>
                            }
                            {
                                edit && <button type="submit">Update</button>
                            }
                        </form>
                    </div>
            }
        </div>
    )
}

export default SubSectionModal;
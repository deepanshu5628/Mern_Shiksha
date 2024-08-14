import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import Rating from 'react-animated-rating';
import { useState } from "react";
import {toast} from "react-toastify"
import {CreateReview} from "../../../services/operations/courseDetailsAPI";
function CourseReviewModal({ setreviewmodal }) {
    const { token} = useSelector((state) => state.auth);
    const { courseEntireData } = useSelector((state) => state.viewCourse);
    const [rating, setRating] = useState(0);
    const [review,setreview]=useState("");

    // fxn to handle rating
    function handleRating(rate) {
        console.log(rate);
    }
    // save review fxn 
    async function createreview(){
        let data={
            courseId:courseEntireData._id,
            review:review,
            rating:rating,
        }
        try {
            let res=await CreateReview(data,token);
            if(res.success){
                toast.success(res.message);
                setreviewmodal(false);
            }
            if(!res.success){
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);            
        }
        
    }
    return (
        <div className="w-full md:w-[60%] h-auto text-white bg-richblack-900 absolute bottom-20 md:absolute md:bottom-20 md:left-40  lg:absolute lg:bottom-40 lg:left-72">
            <div className="flex-col">
                <div className="flex justify-between px-2 bg-richblack-700 p-2 text-lg cursor-default">
                    <h1>Add Review</h1>
                    <button onClick={() => setreviewmodal(false)} className="text-2xl"><RxCross2 /></button>
                </div>
                <div className="px-4 flex-col my-4 justify-evenly">
                    <div className="flex bg-richblack-900 my-1 justify-center gap-3">
                        <img src={courseEntireData.thumbnail} className="h-16 w-16 rounded-full" alt="sd" />
                        <div className="bg-richblack-900 cursor-default">
                            <p className="text-lg">{courseEntireData.Instructor.firstName} {courseEntireData.Instructor.lastName}</p>
                            <p className="text-richblack-200" >Posting publicaliy</p>
                        </div>
                    </div>
                    <div className="bg-richblack-900 my-1 flex justify-center">
                    <Rating
                    onChange={(value)=>setRating(value)}
                    />
                    </div>
                    <div className="bg-richblack-900 px-7 my-1">
                        <label htmlFor="review">Add Your Experince</label>
                        <textarea className="bg-richblack-700 w-full h-20" 
                        name="review"
                        onChange={(e)=>setreview(e.target.value)}
                        id="review"></textarea>
                    </div>
                    <div className="flex bg-richblack-900 my-4 justify-end gap-5">
                        <button onClick={() => setreviewmodal(false)} className="p-2 text-black rounded-lg bg-richblack-400">Cancel</button>
                        <button onClick={createreview} className="p-2 text-black rounded-lg bg-yellow-50">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CourseReviewModal;
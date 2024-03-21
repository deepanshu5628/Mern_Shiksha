import { CiCirclePlus } from "react-icons/ci";
import {useSelector,useDispatch} from "react-redux";
import {setEdit,setStep} from "../../../../../../redux/Slices/courseSlice";
function CourseBuilderForm() {
  const dispatch=useDispatch();
    let {step}=useSelector((state)=>state.course);
    function backbtnfxn(){
        dispatch(setStep(1));
        dispatch(setEdit(true));
    }

  return (
    <div className="flex-col">
      <div className="text-white ">
        <h1 className="font-semibold text-2xl">Course Builder</h1>
        <br />
        <div>
          <label htmlFor="secname">Section Name</label>
          <input
            type="text"
            id="secname"
            className="w-full bg-richblack-700 rounded-md p-1 text-richblack-25"
          />
        </div>
        <button
          className="text-center text-[13px] px-6 py-3 rounded-md 
             font-bold text-black bg-yellow-50 hover:scale-95 transition-all 
             duration-200 my-3"
        >
          <div className="flex items-center gap-2">
            <p>Create Section</p>
            <CiCirclePlus />
          </div>{" "}
        </button>
      </div>
      {/* buttons div */}
      <div className="flex  justify-end">
        <div className=" flex gap-8">
          <button
            className="text-center text-[13px] px-6 py-3 rounded-md 
             font-bold text-black bg-richblack-400 hover:scale-95 transition-all 
             duration-200 my-3"
             onClick={backbtnfxn}
             >
            
            on
            Back{" "}
          </button>
          <button
            className="text-center text-[13px] px-6 py-3 rounded-md 
             font-bold text-black bg-yellow-50 hover:scale-95 transition-all 
             duration-200 my-3"
          >
            Next{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseBuilderForm;

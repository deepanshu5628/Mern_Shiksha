import { useDispatch, useSelector } from "react-redux";
import { IoMdCloudUpload } from "react-icons/io";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom"
import { updateDisplayPicture } from "../../../../services/operations/SettingAPI";
function Photoupload() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { user,image } = useSelector((state) => state.profile);
  const {token}=useSelector((state)=>state.auth);
  const {handleSubmit,reset,register,formState:{errors}}=useForm();
  function imagesubmit(data){
    let p={...data};
    let file=p.profilepicture[0];
    dispatch(updateDisplayPicture(file,token,navigate));
  }
  return (
    <>
      <section className="bg-richblack-800 h-auto py-6 px-8 rounded-md w-[70%] flex justify-between items-center">
      <form  className="flex justify-between w-full items-center" onSubmit={handleSubmit(imagesubmit)}>
        <div className="flex gap-3">
          {/* image div  */}
          <div>
            <img className="rounded-full w-20 h-20 " src={image} alt="" />
          </div>
          {/* upload button */}
          <div className="flex-col ">
            <p className="text-white font-semibold pb-2 text-lg">
              Change Profile Picture
            </p>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 
             rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              name="profilepicture"
              accept="image/*"
              {...register("profilepicture",{required:{value:true,message:"image is required"}})}
            />
            <span className="text-sm text-pink-600">max size 100kb</span>
            {
              errors.profilepicture && (
                <span className="text-yellow-50"> {errors.profilepicture.message}</span>
              )
            }
          </div>
        </div>
        <div>
          <button
            className="flex items-center gap-2 text-center
          hover:scale-95 transition-all duration-200 text-black
           bg-caribbeangreen-200 text-[13px] px-6 py-3
            rounded-md  font-bold"
          >
            Upload <IoMdCloudUpload className="text-2xl" />
          </button>
        </div>
        </form>
      </section>
    </>
  );
}

export default Photoupload;

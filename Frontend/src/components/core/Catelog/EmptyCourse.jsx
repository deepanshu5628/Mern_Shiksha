import { IoTrashBinSharp } from "react-icons/io5";

function EmptyCourse(){
    return (
        <div >
        <p className="text-white ">No Course Found</p>
        <div className=" pl-24">
        <IoTrashBinSharp className="text-pink-300 text-7xl " />
        </div>
       </div>
    )
}

export default EmptyCourse;
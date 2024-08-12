import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import { deleteaccount } from "../../../../services/operations/SettingAPI";
function Deleteaccount() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {token}=useSelector((state)=>state.auth);
  function deletebtn(){
    dispatch(deleteaccount(token,navigate))
  }
  return (
    <>
      <section className="bg-pink-800 flex items-center gap-6 h-auto py-6 px-8 rounded-md w-[70%]">
        {/* icon div */}
        <div className="text-pink-500 text-7xl  ">
          <MdDelete className="border rounded-full bg-pink-900 p-3" />
        </div>
        {/* info div */}
        <div className="w-[60%] bg-pink-800">
          <h2 className="font-semibold">Delete Account</h2>
          <p>Would you like to delete account?</p>
          <p>
            This account may contain Paid Courses. Deleting your account is
            permanent and will remove all the contain associated with it.
          </p>
          <Link onClick={deletebtn}>
            {" "}
            <p className="italic ">I want to delete my account.</p>{" "}
          </Link>
        </div>
      </section>
    </>
  );
}

export default Deleteaccount;

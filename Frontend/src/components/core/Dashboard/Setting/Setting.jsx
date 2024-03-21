import { useSelector } from "react-redux";

import Photoupload from "./Photoupload";
import Profileinfo from "./Profileinfo";
import Changepassword from "./Changepassword";
import Deleteaccount from "./Deleteaccount";
function Setting() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="flex flex-col text-richblack-5 items-center my-4 gap-6 w-[100%]">
      <h1 className="text-4xl  font-semibold text-richblack-25">
        Edit Profile
      </h1>

      {/* section 1  phtoo upload*/}
      <Photoupload/>

      {/* section 2  name and addit info*/}
      <Profileinfo/>
      {/* section 3   password changle*/}
      <Changepassword/>

      {/* section 4 delete account */}
      <Deleteaccount/>
    </div>
  );
}

export default Setting;

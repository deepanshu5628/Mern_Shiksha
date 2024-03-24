import { useLocation } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import Myprofile from "../components/core/Dashboard/Myprofile";
import EnrolledCourses from "../components/core/Dashboard/EnrolledCourses";
import Setting from "../components/core/Dashboard/Setting/Setting";
import Cart from "../components/core/Dashboard/Cart"
import { useSelector } from "react-redux";
import MyCourses from "../components/core/Dashboard/MyCourses";
import AddCourse from "../components/core/Dashboard/Addcourse/index"
function Dashboard() {
  const { loading: authloading } = useSelector((state) => state.auth);
  const { loading: profileloading } = useSelector((state) => state.profile);
  const location = useLocation();
  const currpath = location.pathname;
  return (
    <div className=" h-[calc(100vh-3.5rem)]">
      {authloading || profileloading ? (
        <div className="loader"></div>
      ) : (
        <div className=" flex cursor-default mt-14 h-[calc(100vh-3.5rem)] w-[100%]  overflow-auto  ">
          <div className="w-[13%]">
          <Sidebar />
          </div>
          <div className="flex w-11/12 ml-4  mt-4 h-fit">
          {currpath === "/dashboard/my-profile" ? <Myprofile /> : null}
          {currpath === "/dashboard/setting" ? <Setting /> : null}
          {currpath === "/dashboard/enrolled-courses" ? <EnrolledCourses /> : null}
          {currpath === "/dashboard/cart" ? <Cart /> : null}
          {currpath === "/dashboard/add-course" ? <AddCourse /> : null}
          {currpath === "/dashboard/my-courses" ? <MyCourses /> : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

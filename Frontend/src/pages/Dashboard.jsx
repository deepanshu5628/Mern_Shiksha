import { useLocation } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import Myprofile from "../components/core/Dashboard/Myprofile";
import EnrolledCourses from "../components/core/Dashboard/EnrolledCourses";
import Setting from "../components/core/Dashboard/Setting/Setting";
import Cart from "../components/core/Dashboard/Cart"
import { useSelector } from "react-redux";
import MyCourses from "../components/core/Dashboard/MyCourses";
import AddCourse from "../components/core/Dashboard/Addcourse/index";
import EditCourse from "../components/core/Dashboard/EditCourse";
import Instructor from "../components/core/Dashboard/InstructorDashboard/Instructor";
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
        <div className=" mt-12  md:flex cursor-default md:mt-14 h-[calc(100vh-3.5rem)] md:w-[100%]  overflow-auto  ">
          <div className="w-full md:w-[13%]   ">
          <Sidebar />
          </div>
          <div className="md:flex md:w-11/12 md:ml-4  md:mt-4 md:h-fit">
          {currpath === "/dashboard/my-profile" ? <Myprofile /> : null}
          {currpath === "/dashboard/setting" ? <Setting /> : null}
          {currpath === "/dashboard/enrolled-courses" ? <EnrolledCourses /> : null}
          {currpath === "/dashboard/cart" ? <Cart /> : null}
          {currpath === "/dashboard/add-course" ? <AddCourse /> : null}
          {currpath === "/dashboard/my-courses" ? <MyCourses /> : null}
          {currpath === "/dashboard/edit-course" ? <EditCourse /> : null}
          {currpath === "/dashboard/instructor" ? <Instructor /> : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

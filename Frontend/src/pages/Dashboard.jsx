import { useLocation } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import Myprofile from "../components/core/Dashboard/Myprofile";
import EnrolledCourses from "../components/core/Dashboard/EnrolledCourses";
import Setting from "../components/core/Dashboard/Setting";
import Cart from "../components/core/Dashboard/Cart"
import { useSelector } from "react-redux";
function Dashboard() {
  const { loading: authloading } = useSelector((state) => state.auth);
  const { loading: profileloading } = useSelector((state) => state.profile);
  const location = useLocation();
  const currpath = location.pathname;
  console.log(currpath)
  return (
    <div>
      {authloading || profileloading ? (
        <div className="loader"></div>
      ) : (
        <div className=" flex cursor-default  ">
          <Sidebar />
          <div className="flex w-screen h-fit">
          {currpath === "/dashboard/my-profile" ? <Myprofile /> : null}
          {currpath === "/dashboard/setting" ? <Setting /> : null}
          {currpath === "/dashboard/enrolled-courses" ? <EnrolledCourses /> : null}
          {currpath === "/dashboard/cart" ? <Cart /> : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

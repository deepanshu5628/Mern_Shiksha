import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Forgetpasspage from "./pages/Forgetpasspage";
import Updatepassword from "./pages/Updatepassword";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import EditCourse from "./components/core/Dashboard/EditCourse";
import SemiPrivate from "./components/core/Auth/Routes/SemiPrivate"
import PrivateRoute from "./components/core/Auth/Routes/PrivateRoute";
import InstructorPrivateRoute from "./components/core/Auth/Routes/InstructorPrivateRoute";
import StudentPrivateRoute from "./components/core/Auth/Routes/StudentPrivateRoute"
import { useSelector } from "react-redux";
import Catelog from "./pages/Catelog";
import Course from "./pages/Course";
import Notfound from "./pages/Notfound";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import ViewCourse from "./pages/ViewCourse";
function App() {
  const { user } = useSelector((state) => state.profile);
  const { course } = useSelector((state) => state.course);


  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inte">
      <Navbar />
      <Routes>

        {/* public Route 24/7 */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" Component={ContactUs} />
        <Route path="/about" Component={About} />
        <Route path="/Catelog/:categoryid" Component={Catelog} />
        <Route path="/Course/:CourseId" Component={Course} />
        <Route path="*" Component={Notfound} />

        {/* only if the user is not loged in  routes */}

        {/* login Route */}
        <Route
          element={
            <SemiPrivate>
              <Login />
            </SemiPrivate>
          }
        >
          <Route path="/login" Component={Login} />
        </Route>

        {/* signup */}
        <Route
          element={
            <SemiPrivate>
              <Signup />
            </SemiPrivate>
          }
        >
          <Route path="/signup" Component={Signup} />
        </Route>

          {/* verify pass  */}
        <Route
          element={
            <SemiPrivate>
              <VerifyEmail />
            </SemiPrivate>
          }
        >
          <Route path="/verifyemail" Component={VerifyEmail} />
        </Route>

        {/* forget pass */}
        <Route
          element={
            <SemiPrivate>
              <Forgetpasspage />
            </SemiPrivate>
          }
        >
          <Route path="/forgot-password" Component={Forgetpasspage} />
        </Route>

        {/* Update pass */}
        <Route
          element={
            <SemiPrivate>
              <Updatepassword />
            </SemiPrivate>
          }
        >
           <Route path="/update-password/:id" Component={Updatepassword} /> 
        </Route>



        {/* user specific routes (loged in user)*/}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" Component={Dashboard} />
          <Route path="/dashboard/setting" Component={Dashboard} />
        </Route>

        {/* student ROoutes */}
        <Route
          element={
            <StudentPrivateRoute>
              <Dashboard />
            </StudentPrivateRoute>
          }
        >
          <Route path="/dashboard/enrolled-courses" Component={Dashboard} />
          <Route path="/dashboard/cart" Component={Dashboard} />
        </Route>
        {/* view Course */}
        <Route
          element={
            <StudentPrivateRoute>
              <ViewCourse/>
            </StudentPrivateRoute>
          }
        >
          <Route path="/view-course/:courseid" Component={VideoDetails} />
          {/* <Route path="/view-course/:id/sectionid/:id/sub-sectionid/:Id" Component={VideoDetails} /> */}
        </Route>


        {/* instrucrote Routes */}
        <Route
          element={
            <InstructorPrivateRoute>
              <Dashboard />
            </InstructorPrivateRoute>
          }
        >
          <Route path="/dashboard/instructor" Component={Dashboard} />
          <Route path="/dashboard/my-courses" Component={Dashboard} />
          <Route path="/dashboard/add-course" Component={Dashboard} />
          <Route path="/dashboard/edit-course" Component={Dashboard} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;

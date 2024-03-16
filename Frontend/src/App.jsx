import './App.css'
import {Route,Routes} from "react-router-dom";
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import signup from "./pages/Signup";
import VerifyEmail from './pages/VerifyEmail';
import Forgetpasspage from './pages/Forgetpasspage';
import Updatepassword from './pages/Updatepassword';
import ContactUs from "./pages/ContactUs";
import About from './pages/About';
import Dashboard from "./pages/Dashboard"
function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inte'>
    <Navbar/>
    <Routes>
      <Route path='/'  element={<Home/>}/>
      <Route path='/login' Component={Login}/>
      <Route path='/signup' Component={signup}/>
      <Route path='/verifyemail' Component={VerifyEmail}/>
      <Route path='/forgot-password' Component={Forgetpasspage}/>
      <Route path='/update-password/:id' Component={Updatepassword} />
      <Route path='/contact' Component={ContactUs}/>
      <Route path='/about' Component={About}/>


      {/* sidebar routes */}
      <Route path='/dashboard/my-profile' Component={Dashboard}/>
      <Route path='/dashboard/instructor' Component={Dashboard}/>
      <Route path='/dashboard/my-courses' Component={Dashboard}/>
      <Route path='/dashboard/add-course' Component={Dashboard}/>
      <Route path='/dashboard/setting' Component={Dashboard}/>
      <Route path='/dashboard/enrolled-courses' Component={Dashboard}/>
      <Route path='/dashboard/cart' Component={Dashboard}/>
    </Routes>
    </div>
  )
}

export default App

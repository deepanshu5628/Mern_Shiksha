import './App.css'
import {Route,Routes} from "react-router-dom";
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import signup from "./pages/Signup";
import VerifyEmail from './pages/VerifyEmail';
function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inte'>
    <Navbar/>
    <Routes>
      <Route path='/'  element={<Home/>}/>
      <Route path='/login' Component={Login}/>
      <Route path='/signup' Component={signup}/>
      <Route path='/verifyemail' Component={VerifyEmail}/>
    </Routes>
    </div>
  )
}

export default App

import './App.css'
import {Route,Routes} from "react-router-dom";
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inte'>
    <Navbar/>
    <Routes>
      <Route path='/'  element={<Home/>}/>
      <Route path='/login' Component={Login}/>
    </Routes>
    </div>
  )
}

export default App

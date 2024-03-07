import logoimage from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import {apiconnector} from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { useEffect, useState } from "react";
import { logout } from "../../services/operations/authAPI";
import {user} from "../../services/apis";
function Navbar (){
    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {token}=useSelector((state)=>state.auth)
    const totalitems=useSelector((state)=>state.cart.totalitems);
    const [sublinks,setsublinks]=useState([]);

    // logout btn handler
    function logoutbtnhandler(){
        dispatch(logout(navigate));
    }

    // fetch category data using the connetor fucntion 
    async function catefetch(){
        try {
            let res= await apiconnector("GET",categories.CATEGORIES_API_SHOWALLCATEGORIES);
            let result=res.allcategory;
            // console.log(result);
            setsublinks(result);
        } catch (error) {
            console.log("problem in fetch category detail's ");
            console.log(error);
        }
    }
    useEffect(()=>{
        catefetch();
    },[]);
    return (
        <div className=" w-full items-center flex justify-center border-b-[1px] border-b-richblack-700 ">
            <div className="w-11/12 max-w-maxContent  h-14 flex items-center justify-between">

            {/* image div  */}
            <div className=""> 
                <img width={160} height={42} src={logoimage} alt="logoimage" />
            </div>
            {/* nav option */}
             <nav>
                <ul className="flex gap-x-6 text-richblack-25 cursor-pointer">
                {NavbarLinks.map((nav,index)=>{
                    return <li key={index}>
                        {
                            nav.title==="Catalog" ? (
                            <div className="flex items-center gap-2 group"> 
                                <p>{nav.title}</p>
                                <span><IoIosArrowDown className="hover:"/></span>

                                {/* hover div 's */}
                                <div className="invisible absolute left-[47%] translate-x-[-50%]
                                translate-y-[80%] top-[0%] flex flex-col rounded-md bg-richblack-5 p-4
                                text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible 
                                group-hover:opacity-100 z-50 lg:w-[300px]">
                                <div className="absolute left-[50%] top-0 translate-x-[80%] 
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5">
                                </div>
                                {
                                        sublinks.map((cate,index)=>{
                                            return <Link  key={index} to={`catelog/${cate.name}`}>
                                            <p className="text-center text-xl hover:border">{cate.name}</p>
                                            </Link>
                                        })
                                    }
                                </div>

                            </div>
                            
                            ):(
                                <Link  to={nav.path}>
                                    <p className={`${location.pathname === nav.path ? "text-yellow-25 ":"text-richblack-25 "}`}>{nav.title}</p> 
                                </Link>
                            )
                        }
                        </li>
                })}
                </ul>
             </nav>
            {/* buttons */}
            <div className="flex gap-x-4 items-center text-white ">
                {/* if the userr is not loged in  */}
                {token ===null && <div>
                    <Link to="/login">
                    <button>Login</button>
                    </Link>
                    </div>}
                {token ===null && <div>
                    <Link to="/signup">
                    <button >Signup</button>
                    </Link>
                    </div>}

                {/*if user is loged in   */}
                {
                    token !==null && <div>
                        <Link to="/dashborad">
                        <button>Dashboard</button>
                        </Link>
                    </div>
                }
                {
                    token !==null && <div>
                        <button onClick={logoutbtnhandler}>Logout</button>
                    </div>
                }
                {
                    token !==null && <div className=" flex items-center ">
                        <CiShoppingCart className="text-4xl opacity-80" />
                        <p className="absolute right-12 text-sm ">{totalitems}</p>
                    </div>
                    
                }
            </div>
            </div>

        </div>
    )
}

export default Navbar;
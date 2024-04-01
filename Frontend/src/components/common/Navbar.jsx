import logoimage from "../../assets/Shiksha/sample1.png";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { apiconnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { useEffect, useState } from "react";
import { logout } from "../../services/operations/authAPI";
import { FaCaretDown } from "react-icons/fa";
import { user } from "../../services/apis";
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const totalitems = useSelector((state) => state.cart.totalitems);
  const { user,image:dpimage } = useSelector((state) => state.profile);
  const [sublinks, setsublinks] = useState([]);
  let dashboarpaths=location.pathname.split("/")[1];
  // console.log(location.pathname.split("/")[1])
  // logout btn handler
  function logoutbtnhandler() {
    dispatch(logout(navigate));
  }
  // console.log(sublinks)

  // fetch category data using the connetor fucntion
  async function catefetch() {
    try {
      let res = await apiconnector(
        "GET",
        categories.CATEGORIES_API_SHOWALLCATEGORIES
      );
      let result = res.allcategory;
      // console.log(result);
      setsublinks(result);
    } catch (error) {
      console.log("problem in fetch category detail's ");
      console.log(error);
    }
  }
  useEffect(() => {
    catefetch();
  }, []);
  return (
    <div className={` w-full  items-center flex  bg-richblack-800 justify-center border-b-[1px] border-b-richblack-700 ${dashboarpaths==="dashboard" ? "fixed" :null} ${dashboarpaths==="view-course" ? "fixed" :null} `}>
      <div className="w-11/12 max-w-maxContent px-3  h-14 flex items-center justify-between">
        {/* image div  */}
        <Link to="/">
        <div className="">
          <img className="h-[54px] w-[165px] rounded-lg" src={logoimage} alt="logoimage" />
        </div>
        </Link>
        {/* nav option */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25 cursor-pointer">
            {NavbarLinks.map((nav, index) => {
              return (
                <li key={index}>
                  {nav.title === "Catalog" ? (
                    <div className="flex items-center gap-2 group">
                      <p>{nav.title}</p>
                      <span>
                        <IoIosArrowDown className="" />
                      </span>

                      {/* hover div 's */}
                      <div
                        className="invisible absolute left-[47%] top-[2%]  z-[1000] 
                                    flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col
                                     rounded-lg  bg-richblack-800 p-4 text-richblack-25 opacity-0 
                                     transition-all duration-150 group-hover:visible 
                                     group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                      >
                        <div
                          className="absolute left-[50%] top-0 -z-10 h-6 w-6
                                    translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded
                                     bg-richblack-800"
                        ></div>
                        {sublinks.map((cate, index) => {
                          return (
                            <Link key={index} to={`catelog/${cate.link}`}>
                              <p className="text-center text-xl hover:border">
                                {cate.name}
                              </p>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <Link to={nav.path}>
                      <p
                        className={`${
                          location.pathname === nav.path
                            ? "text-yellow-25 "
                            : "text-richblack-25 "
                        }`}
                      >
                        {nav.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        {/* buttons */}
        <div className="flex gap-x-4 items-center text-white ">
          {/* if the userr is not loged in  */}
          {token === null && (
            <div>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
          )}
          {token === null && (
            <div>
              <Link to="/signup">
                <button>Signup</button>
              </Link>
            </div>
          )}

          {/*if user is loged in   */}
          {token !== null && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart">
            <div className=" flex items-center  cursor-pointer">
               <CiShoppingCart  className="text-4xl opacity-80" /> 
              <p className="relative right-5 text-sm ">{totalitems}</p>
            </div>
            </Link>
          )}
          {token !== null && (
            <div
             onClick={()=>navigate("/dashboard/my-profile")}
              className="flex items-center gap-1 cursor-pointer ">
              <img
                className="rounded-full h-[39px] w-[39px]"                
                src={dpimage}
                alt=""
              />
             
            </div>
          )}
                 {
                    token !==null && <div>
                        <button 
                        onClick={logoutbtnhandler}
                        className="bg-yellow-200 p-2 text-black text-lg font-semibold rounded-lg hover:bg-pink-600 hover:text-white"
                        >Logout</button>
                    </div>
                }
                 
        </div>
      </div>
    </div>
  );
}

export default Navbar;

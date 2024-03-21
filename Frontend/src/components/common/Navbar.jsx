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
  // logout btn handler
  function logoutbtnhandler() {
    dispatch(logout(navigate));
  }

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
    <div className={` w-full  items-center flex  bg-richblack-800 justify-center border-b-[1px] border-b-richblack-700 ${dashboarpaths==="dashboard"? "fixed" :null} `}>
      <div className="w-11/12 max-w-maxContent  h-14 flex items-center justify-between">
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
                        className="invisible absolute left-[46%] top-[5%] z-[1000] 
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
                            <Link key={index} to={`catelog/${cate.name}`}>
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
            <div className=" flex items-center ">
              <Link to="/dashboard/cart"> <CiShoppingCart  className="text-4xl opacity-80" /> </Link>
              <p className="relative right-5 text-sm ">{totalitems}</p>
            </div>
          )}
          {token !== null && (
            <div className="flex items-center gap-1 ">
              <img
                className="rounded-full h-[39px] w-[39px]"                
                src={dpimage}
                alt=""
              />
              {/* <FaCaretDown className="hover:bg-richblack-600" /> */}
              <select name="" id="" className="w-5  bg-richblack-800 relative right-0">
                <option value="">Dashobard</option>
                <option value="">Logout</option>
              </select>
            </div>
          )}
                 {
                    token !==null && <div>
                        <button onClick={logoutbtnhandler}>Logout</button>
                    </div>
                }
                 {
                    token !==null && <div>
                        <button onClick={()=>navigate("/dashboard/my-profile")}>Dashboard</button>
                    </div>
                }
        </div>
      </div>
    </div>
  );
}

export default Navbar;

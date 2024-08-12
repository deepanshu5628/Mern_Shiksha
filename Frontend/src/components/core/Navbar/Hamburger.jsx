import { IoIosArrowDown } from "react-icons/io";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";

function Hamburger({ NavbarLinks, loading, sublinks,sethamburger }) {
    return (
        <div className="transition-all duration-2000  h-fit py-4 w-full ">
            <div onClick={()=>sethamburger(false)} className="absolute right-5">
                <ImCross />
            </div>
            <ul className="text-center">
                {NavbarLinks.map((nav, index) => {
                    return (
                        <li key={index}>
                            {nav.title === "Catalog" ? (
                                <div className="flex relative left-[40%] md:left-[46%] lg:left-[47%] w-full text-center  gap-2 group">
                                    <p className="text-richblack-25">{nav.title}</p>
                                    <span>
                                        <IoIosArrowDown className="text-richblack-25 relative top-2" />
                                    </span>

                                    {/* hover div 's */}
                                    <div
                                        className=" invisible absolute left-[10%]  top-0  z-[1000] 
                                    flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col
                                     rounded-lg  bg-richblack-800 p-4 text-richblack-25 opacity-0 
                                     transition-all duration-150 group-hover:visible 
                                     group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                                    >
                                        {/* <div
                                            className="absolute left-[50%] top-0 -z-10 h-6 w-6
                                    translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded
                                     bg-richblack-800"
                                        ></div> */}
                                        {/* <div
                                        className="invisible absolute left-[45%] top-4  z-[1000] 
                                    flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col
                                     rounded-lg  bg-richblack-800 p-4 text-richblack-25 opacity-0 
                                     transition-all duration-150 group-hover:visible 
                                     group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                                    >
                                        <div
                                            className="absolute left-[50%] top-0 -z-10 h-6 w-6
                                    translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded
                                     bg-richblack-800"
                                        ></div> */}
                                        {
                                            loading ? <div className="loader"></div> :
                                                <>
                                                    {sublinks.map((cate, index) => {
                                                        return (
                                                            <Link key={index} to={`catelog/${cate.link}`}>
                                                                <p  onClick={()=>sethamburger(false)}
                                                                className="text-center text-xl hover:border">
                                                                    {cate.name}
                                                                </p>
                                                            </Link>
                                                        );
                                                    }
                                                    )}
                                                </>
                                        }
                                    </div>
                                </div>
                            ) : (
                                <Link  to={nav.path}>
                                    <p onClick={()=>sethamburger(false)}
                                        className={`${location.pathname === nav.path
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
        </div>
    )
}

export default Hamburger
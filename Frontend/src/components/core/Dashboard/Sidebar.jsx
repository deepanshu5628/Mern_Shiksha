import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useSelector } from "react-redux";
function Sidebar() {
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();
  const currpath=location.pathname;
  return (
    <div
      className="bg-richblack-800 fixed min-w-[13%] h-[calc(100vh-3.5rem)]   pl-1  py-4
          text-richblack-25"
    >
      {sidebarLinks.map((element, index) => {
        return (
          <div
            key={element.id}
            className={`flex-col items-center justify-center py-2 px-2 cursor-pointer
             pr-2  `}
          >
            {element.type === "all" && (
              <Link to={element.path}>
                <p className={` pl-2${element.path==currpath ? " border-l-4 py-2 w-full border-yellow-25 bg-yellow-600":null}`}>{element.name}</p>
              </Link>
            )}
            {element.type === user.accountType && (
                <Link to={element.path}>
                <p className={` pl-2${element.path==currpath ? " border-l-4 py-2 w-full border-yellow-25 bg-yellow-600 ":null}`}>{element.name}</p>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;

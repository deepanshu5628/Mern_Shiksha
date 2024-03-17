import { Link } from "react-router-dom";

function CTAButton({children,type="default" ,active=false,linkto}){
    return (
        <Link to={linkto}>
        <button type={type} className={`text-center text-[13px] px-6 py-3 rounded-md  font-bold
        ${active? "text-black bg-yellow-50" : "text-white bg-richblack-800"}
        hover:scale-95 transition-all duration-200`}>
            {children}
        </button>
        </Link>
    )
}

export default CTAButton;
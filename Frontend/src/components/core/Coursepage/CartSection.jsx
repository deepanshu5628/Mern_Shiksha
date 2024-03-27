import { useEffect, useState } from "react";
import { FaShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import copy from "copy-to-clipboard"
import { useNavigate } from "react-router-dom"
import { addToCart, } from "../../../redux/Slices/cartSlice";
function CartSection({ coursedetails }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile)
    let { cart } = useSelector((state) => state.cart);
    
    // user state
    let [curruser, setcurruser] = useState(null);

    // buy btn
    function buybtn() {
        if (curruser === null) {
            toast.error("you need to login first");
            navigate("/login")
            return
        }
        if (curruser.accountType !== "Student") {
            toast.error("A Instructor Cannot buy a course");
            return
        }
        console.log("button is clicked");
    }

    // add to cart 
    function cartbtn() {
        if (curruser === null) {
            toast.error("you need to login first");
            navigate("/login")
            return
        }
        if (curruser.accountType !== "Student") {
            toast.error("A Instructor Cannot Add A Course to Cart");
            return
        }
         dispatch(addToCart(coursedetails));
        }

        // Use Efffect
        useEffect(() => {
            setcurruser(user);
    }, [])

    // share btn
    function sharebtn() {
        // copy(window.location.href)
        copy(window.location.href)
        toast.success("Link copied to clipboard")
    }

    return (
        <div className="w-[32%] h-fit p-5 pb-2 rounded-md flex-col  relative bottom-44  bg-richblack-700">
            <p className="text-3xl my-1">{coursedetails.courseName}</p>
            <img className="my-1 rounded-md" src={coursedetails.thumbnail} alt="Thubnail" />
            <p className="my-1 font-semibold text-3xl">Rs.{coursedetails.price}</p>
            <div className="flex-col  items-center   my-1">
                <button
                    // disabled={curruser !== null && curruser.accountType === "Instructor"}
                    onClick={() => buybtn()}
                    className="bg-yellow-100 w-full p-2 my-1 rounded-md text-black  hover:border-x-4 hover:border-richblack-800">Buy Now</button>
                <button
                    // disabled={curruser !== null && curruser.accountType === "Instructor"}
                    onClick={() => cartbtn()}
                    className="bg-richblack-800 w-full my-1 p-2 rounded-md text-white  hover:border-x-4 hover:border-richblack-50">Add to Cart</button>
            </div>
            <p className="my-1 text-center">30-Day Money-Back Guarantee</p>
            <div onClick={sharebtn} className="my-1 flex items-center justify-center gap-3 text-lg cursor-pointer">
                <FaShareSquare className="text-yellow-100" />
                <p  className=" text-yellow-100">   Share</p>
            </div>
        </div>
    )
}

export default CartSection;
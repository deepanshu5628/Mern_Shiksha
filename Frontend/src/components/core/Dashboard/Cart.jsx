import { IoTrashBinOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { removeFromCart } from "../../../redux/Slices/cartSlice";
import { useNavigate } from "react-router-dom";
import {buyCourse} from "../../../services/operations/paymentAPI"
function Cart() {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const { totalitems, cart, totalprice } = useSelector((state) => state.cart);
  const {token } = useSelector((state) => state.auth);
  const {user } = useSelector((state) => state.profile);

  // checkout btn
  function checkoutbtn(){
    let bodydata=[];
    for(const id of cart){
      bodydata.push(id._id);
    }
    if(token){
      buyCourse(token,bodydata,user,navigate,dispatch);
      return 
    }

  }

  // delbtn
  function delbtn(id){
    console.log("button is clicked",id); 
    dispatch(removeFromCart(id)); 
  }
  return (
    <div className="flex flex-col text-richblack-5 w-[100%] items-center md:h-screen mb-8 gap-6  ">
      <section className="bg-richblack-800 pl-10    rounded-md mt-12  w-full md:w-[70%] md:h-auto pb-9  flex-col justify-between items-center">
        <h1 className="text-2xl  md:text-4xl relative my-10  font-semibold text-richblack-25">
          Cart
        </h1>
        {totalitems === 0 ? (
          <div className="mt-5 flex-col text-center  pb-16  text-xl font-semibold">
            <div className="text-center  ">
              <p>Your Cart is Empty</p>{" "}
            </div>
            <div className="text-4xl  md:text-9xl text-pink-200 mt-10 flex justify-center">
              <IoTrashBinOutline />
            </div>
          </div>
        ) : (
          // pending
          <div className=" w-[95%]  ">
            {
              cart.length > 0 && cart.map((items, index) => {
                return <div
                  className="flex flex-col items-center md:flex-row min-w-fit md:justify-evenly bg-richblack-900 my-4 rounded-lg border-t-2 border-richblack-300"
                  key={index}>
                  {/* image div */}
                  <div className=" p-2 pl-4   md:w-[37%] ">
                    <img src={items.thumbnail} className="h-32 pt-2 w-44 rounded-md" alt="asf" />
                  </div>
                  {/* info div */}
                  <div className="text-2xl flex-col w-[37%] py-3  items-center">
                    <p className="font-semibold">{items.courseName}</p>
                    <p className="mt-4 text-richblack-100">{items.category.name}</p>
                  </div>
                  {/* button div */}
                  <div className="flex-col w-[23%] ">
                    <button
                    onClick={()=>delbtn(items._id)}
                      className="md:text-lg lg:text-2xl  text-center text-pink-200 p-2 my-3  rounded-md bg-richblack-600">
                      Remove
                    </button>
                    <div className="flex  items-center justify-center text-2xl p-2 text-yellow-100 mx-3">
                      <FaIndianRupeeSign className="pt-1" />
                      <p className="text-4xl" > {items.price}</p>
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        )}
      </section>
      {
        cart.length > 0 && <section className="bg-richblack-800  rounded-md mb-3 w-full md:w-[70%] h-auto py-5  flex-col  justify-between items-center">
          <div className="flex justify-between py-4 px-14">
            <div className="md:text-4xl py-3">Cart Summary:</div>
            <div className="text-3xl md:text-7xl flex text-yellow-100"><FaIndianRupeeSign className="pt-1" /> {totalprice}</div>
          </div>
          <div className="ml-10  mr-4">
            <button
            onClick={checkoutbtn}
            className="bg-yellow-100 p-2 w-full text-black rounded-md">CheckOut</button>
          </div>
        </section>
      }
    </div>
  );
}

export default Cart;

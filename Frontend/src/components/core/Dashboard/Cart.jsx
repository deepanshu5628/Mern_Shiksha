import { IoTrashBinOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { removeFromCart } from "../../../redux/Slices/cartSlice";
function Cart() {
  const dispatch=useDispatch();
  const { totalitems, cart, totalprice } = useSelector((state) => state.cart);
  // console.log(cart);


  // delbtn
  function delbtn(id){
    console.log("button is clicked",id); 
    dispatch(removeFromCart(id)); 
  }
  return (
    <div className="flex flex-col text-richblack-5 w-[100%] items-center h-screen mb-8 gap-6  ">
      <section className="bg-richblack-800 pl-10    rounded-md mt-12  w-[70%] h-auto pb-9  flex-col justify-between items-center">
        <h1 className="text-4xl relative my-10  font-semibold text-richblack-25">
          Cart
        </h1>
        {totalitems === 0 ? (
          <div className="mt-5 flex-col text-center  pb-16  text-xl font-semibold">
            <div className="text-center  ">
              <p>Your Cart is Empty</p>{" "}
            </div>
            <div className="text-9xl text-pink-200 mt-10 flex justify-center">
              <IoTrashBinOutline />
            </div>
          </div>
        ) : (
          // pending
          <div className=" w-[95%]  ">
            {
              cart.length > 0 && cart.map((items, index) => {
                return <div
                  className=" sm::flex-col lg:flex justify-evenly bg-richblack-900 my-4 rounded-lg border-t-2 border-richblack-300"
                  key={index}>
                  {/* image div */}
                  <div className=" p-2 pl-4   w-[37%] ">
                    <img src={items.thumbnail} className="h-32 pt-2 w-44 rounded-md" alt="asf" />
                  </div>
                  {/* info div */}
                  <div className="text-2xl flex-col w-[37%] py-3  items-center">
                    <p className="font-semibold">{items.courseName}</p>
                    <p className="mt-4 text-richblack-100">{items.category.name}</p>
                  </div>
                  {/* button div */}
                  <div className="flex-col w-[25%] p-3 ">
                    <button
                    onClick={()=>delbtn(items._id)}
                      className="text-2xl  text-center text-pink-200 p-2 my-3  rounded-md bg-richblack-600">
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
        cart.length > 0 && <section className="bg-richblack-800  rounded-md mb-3  w-[70%] h-auto py-5  flex-col  justify-between items-center">
          <div className="flex justify-between py-4 px-14">
            <div className="text-4xl py-3">Cart Summary:</div>
            <div className="text-7xl flex text-yellow-100"><FaIndianRupeeSign className="pt-1" /> {totalprice}</div>
          </div>
          <div className="ml-16">
            <button className="bg-yellow-100 p-2  text-black rounded-md">CheckOut</button>
          </div>
        </section>
      }
    </div>
  );
}

export default Cart;

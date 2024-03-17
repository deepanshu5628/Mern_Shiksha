import { IoTrashBinOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

function Cart() {
    const {totalitems}=useSelector((state)=>state.cart);

  return (
    <div className="flex flex-col text-richblack-5 w-[100%] items-center h-screen gap-6 ">
      <section className="bg-richblack-800 pl-10  rounded-md my-12  w-[70%] h-[75%] flex-col justify-between items-center">
        <h1 className="text-4xl relative my-10  font-semibold text-richblack-25">
          Cart
        </h1>
        {totalitems === 0 ? (
          <div className="mt-5 flex-col text-center   text-xl font-semibold">
            <div className="text-center ">
              <p>Your Cart is Empty</p>{" "}
            </div>
            <div className="text-9xl mt-10 flex justify-center">
              <IoTrashBinOutline />
            </div>
          </div>
        ) : (
            // pending
          <div> Cart</div>
        )}
      </section>
    </div>
  );
}

export default Cart;
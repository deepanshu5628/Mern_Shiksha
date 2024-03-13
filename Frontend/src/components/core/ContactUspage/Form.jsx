import { useEffect } from "react";
import countrycode from "../../../data/countrycode.json";
import { useForm } from "react-hook-form";
import {apiconnector} from "../../../services/apiconnector";
import {contactus} from "../../../services/apis";
import {toast} from "react-toastify"
import { useDispatch } from "react-redux";
import {setLoading} from "../../../redux/Slices/authSlice";
function Form(){
    const dispatch=useDispatch();  
    const {register,handleSubmit,reset,formState:{errors,isSubmitSuccessful}}=useForm();
    async function submithandler(data){
        // console.log(data);
        try{
            dispatch(setLoading(true));
            let res=await apiconnector("POST",contactus.CONTACTUS_API_CONTACT,data)
            if(res.success){
                toast.success(res.message);
                reset({
                    email:"",
                    firstName:"",
                    lastName:"",
                    message:"",
                    phoneNo:"",
                    countrycode:"",
                });
            }
            if(!res.success){
                toast.error(res.message);
            }
        }catch(error){
            console.log(error);
        }
        // isSubmitSuccessful(true);
        dispatch(setLoading(false));
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:"",
                countrycode:"",
            })
        }
    },[reset,isSubmitSuccessful])
    return(
        <div className=" flex flex-col  bg">
            <p className="text-3xl font-bold cursor-pointer">Got a Idea? We've got the skills. Let's team up</p>
            <p className="cursor-pointer text-richblack-300">Tell us more about yourself and what you're got in mind.</p>
            <form  onSubmit={handleSubmit(submithandler)}>
               <div className="flex w-full gap-5 my-2 ">
                {/* firstname & lastname */}
                    <div className="flex-col ">
                        <label htmlFor="firstName">FirstName:</label>
                        <br />
                        <input type="text" 
                         placeholder="Enter FirstName"
                         className="w-full p-1 rounded-md bg-richblack-700 text-richblack-25"
                         {...register("firstName",{required:{value:true,message:"Enter First Name"}})}
                         />
                         {errors.firstName&& (
                            <span>{errors.firstName.message}</span>
                         )}
                    </div>
                    <div className="flex-col">
                        <label htmlFor="lastname">LastName:</label>
                        <br />
                        <input type="text" 
                         placeholder="Enter LastName"
                         className="w-full p-1 rounded-md bg-richblack-700 text-richblack-25"
                         {...register("lastName",{required:{value:true,message:"last Name is required"}})}
                         />
                         {errors.lastName&&(
                            <span>{errors.lastName.message}</span>
                         )}
                    </div>
               </div>
               {/* email */}
                <div className="my-2">
                    <label htmlFor="email">Email Address</label>
                    <br />
                    <input className="min-w-full p-1 rounded-md bg-richblack-700 text-richblack-25" 
                    type="text"
                     id="email" 
                     name="email" 
                     placeholder="Enter Email" 
                     {...register("email",{required:{value:true,message:"email is Required"}})}
                     />
                     {errors.email&& (
                        <span>{errors.email.message}</span>
                     )}
                </div>
               
               {/* mobile no  */}
               <div className="my-2">
                    <label htmlFor="phoneNo">Phone Number</label>
                    <br />
                    <div className="flex gap-4  ">
                        <select
                        {...register("countrycode",{required:{value:true,message:"country code is required"}})}
                         className="w-[14%] p-1 rounded-md bg-richblack-700 text-richblack-25">
                            {
                                countrycode.map((element,index)=>
                                {return <option className=" rounded-md p-1 bg-richblack-700 text-richblack-25" 
                                value={element.code} 
                                key={index}>{element.code}{" "}{element.country}</option>
                                }
                                )
                            }
                        </select>
                        <input type="number" 
                        className="w-[88%]
                         rounded-md p-1 bg-richblack-700
                          text-richblack-25"  
                          placeholder="Enter Mobileno" 
                          name="phoneNo"  
                          id="phoneNo"
                          {...register("phoneNo",{
                            required:{value:true,message:"required field"},
                            minLength:{value:10,message:"invalid mobile no "},
                            maxLength:{value:10,message:"invalid mobile no"}
                            })}
                          />
                          {errors.phoneNo&&(
                            <div>{errors.phoneNo.message}</div>
                          )}
                    </div>
               </div>
               {/* mesage */}
               <div className="my-2">
                    <label htmlFor="message">Message</label>
                    <br />
                    <textarea className="bg-richblack-700 p-1 rounded-md text-richblack-25 w-full" id="message"
                     name="message"
                     {...register("message",{required:{value:true,message:"message is required"}})}  
                     rows={5}>
                    </textarea>
                    {errors.message&&(
                        <span>{errors.message.message}</span>
                    )}
               </div>

               <button className="text-center p-3 w-full border rounded-md bg-yellow-100 text-black" type="submit">Send Message</button>
            </form>
        </div>
    )
}

export default Form;
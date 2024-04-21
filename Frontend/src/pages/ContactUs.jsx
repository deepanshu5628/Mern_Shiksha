import { IoMdChatboxes } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import Form from "../components/core/ContactUspage/Form";
import Footer from '../components/common/Footer';
import Info from "../components/core/ContactUspage/Info";
import ReviewSlider from "../components/common/ReviewSlider"
import { useSelector } from "react-redux";
function ContactUs() {
    return (
        <div>
            <div className="lg:flex   justify-between w-full  lg:px-32 my-20  text-richblack-5 ">
                {/* section 1 */}
                <div className="flex-col min-w-3/12 h-fit bg-richblack-800 gap-5 ">
                    <Info logo={<IoMdChatboxes />} heading={"Chat with Us"} des1={"Our friendy is here to help you"} des2={"info@Shiksha.com"} />
                    <Info logo={<BiWorld />} heading={"Visit Us"} des1={"Come and say hello at our office HQ."} des2={"Deepanshu yadav 1st Block 1st Cross Rohtak, Haryana-127307"} />
                    <Info logo={<FaPhoneAlt />} heading={"Call Us"} des1={"Mon - Fri From 8am to 5pm"} des2={"+123 456 7869"} />
                </div>
                {/* section 2 */}
                <div className=" lg:w-6/12 p-7 rounded-2xl  border-2 border-solid ">
                    <Form heading={"Got a Idea? We've got the skills. Let's team up"} description={"Tell us more about yourself and what you're got in mind."} />
                </div>
            </div>
            <div className="px-8">
                <div className="text-4xl font-semibold text-white text-center mt-12 px-2">
                    <p>Review from others learners</p>
                    <ReviewSlider />
                    <div className='relative bottom-5 z-50 w-full h-5 bg-richblack-900'></div>
                </div>
            </div>
            {/* footer */}
            <Footer />
        </div>
    )
}

export default ContactUs;
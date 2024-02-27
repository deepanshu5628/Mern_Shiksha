import HighlightText from "../components/core/Homepage/HighlightText";
import CTAButton from "../components/core/Homepage/CTAButton";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import {Link}from "react-router-dom";
import Banner from "../assets/Images/banner.mp4";
import { FaArrowRight } from "react-icons/fa6";
function Home(){
    return (
        <div>
            {/* section-1 */}
            <div className="relative mx-auto  flex flex-col   w-11/12  max-w-maxContent items-center text-white justify-between ">
                {/* btn ->becmone and instructor  */}
                <Link to={"/signup"}>
                    <div className=" mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold
                     text-richblack-200  transition-all duration-200 hover:scale-95 w-fit">
                    <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all 
                    duration-200 group-hover:bg-richblack-900">
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                    </div>
                </Link>

                {/* main heading */}
                <div className="text-center text-4xl mt-7 font-semibold" >
                    Empower Your Future with<HighlightText textcolor={`${"richblue-200"}`} text={"Coding Skills"}/> 
                    </div>

                {/*subheading   */}
                <div className='text-center w-[90%] text-lg font-bold text-richblack-300 mt-4'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world,
                and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                    </div>

                {/* 2 btns*/}
                <div className="flex flex-row gap-3 mt-8">
                    <CTAButton linkto={"/signup"} active={true}>Learn More</CTAButton>
                    <CTAButton  linkto={"/login"}>Book A demo</CTAButton>
                </div>

                {/* video */}
                <div className="mx-3 my-12 shadow-blue-200" >
                    <video muted loop autoPlay > 
                    <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                {/* code section and typewirter */}
                <div>
                    <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div className="text-4xl font-semibold">
                            Unlock Your 
                            <HighlightText text={"Coding Potential \n"}/>
                            with our onlince courses
                            </div>
                    }
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you." }
                    ctabtn1={
                        {
                            linkto:"/signup",
                            active:true,
                            btntext:"Try it yourself"
                        }
                    }
                    ctabtn2={
                        {
                            linkto:"/login",
                            btntext:"Learn More"
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>Document</title>\n</head>\n<body>\n<a href="/puma">puma</a>\n<a href="/oneeight">oneeight</a>\n</body>\n</html>`}
                    codeColor={"text-yellow-100"}
                    />
                </div>
                <div>
                    <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className="text-4xl font-semibold">
                            Start 
                            <HighlightText text={"coding in"}/>
                            <br />
                            <HighlightText text={"Seconds"}/>
                        </div>
                    }
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson"}
                    ctabtn1={
                        {
                            linto:"/",
                            active:true,
                            btntext:"Continue Lesson",
                        }
                    }
                    ctabtn2={{
                        linkto:"/",
                        btntext:"Learn More"
                    }}
                    codeblock={`import react from "react";\nimport CTAButton from "./Button";\nimport { FaArrowRight } from "react-icons/fa6";\nimport { TypeAnimation } from 'react-type-animation';\n \nconst home()=>{\nreturn home()\n}\n}`}
                    />
                </div>
            </div>
            {/* section-2 */}
            
            {/* section-3 */}
            {/* section-4 */}
            {/* footer */}
        </div>
    )
}

export default Home;
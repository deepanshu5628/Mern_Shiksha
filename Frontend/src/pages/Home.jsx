import HighlightText from "../components/core/Homepage/HighlightText";
import CTAButton from "../components/core/Homepage/CTAButton";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import { Link } from "react-router-dom";
import Banner from "../assets/Images/banner.mp4";
import imageno1 from "../assets/Images/TimelineImage.png";
import imgtwo from "../assets/Images/Compare_with_others.png";
import imgonee from "../assets/Images/Know_your_progress.png";
import imgthree from "../assets/Images/Plan_your_lessons.png";
import logoone from "../assets/TimeLineLogo/Logo1.svg";
import logotwo from "../assets/TimeLineLogo/Logo2.svg";
import logothree from "../assets/TimeLineLogo/Logo3.svg";
import logofour from "../assets/TimeLineLogo/Logo4.svg";
import instructorimg from "../assets/Images/Instructor.png";
import { FaArrowRight } from "react-icons/fa6";
import ExploreMore from "../components/core/Homepage/ExploreMore";
import RecBox from "../components/core/Homepage/RecBox";
import Footer from "../components/common/Footer";
import {useSelector} from "react-redux"
import Spinner from "../components/common/Spinner";
function Home() {
  const { loading } = useSelector((state) => state.auth);
  return (
    <div>
      {loading ? (
       <Spinner/> 
      ) : (
        <div>
          {/* section-1 */}
          <div className="relative mx-auto  flex flex-col   w-11/12  max-w-maxContent items-center text-white justify-between ">
            {/* btn ->becmone and instructor  */}
            <Link to={"/signup"}>
              <div
                className=" mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold
                     text-richblack-200  transition-all duration-200 hover:scale-95 w-fit"
              >
                <div
                  className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all 
                    duration-200 group-hover:bg-richblack-900"
                >
                  <p>Become an Instructor</p>
                  <FaArrowRight />
                </div>
              </div>
            </Link>

            {/* main heading */}
            <div className="text-center text-4xl mt-7 font-semibold">
              Empower Your Future with
              <HighlightText
                textcolor={`${"richblue-200"}`}
                text={"Coding Skills"}
              />
            </div>

            {/*subheading   */}
            <div className="text-center w-[90%] text-lg font-bold text-richblack-300 mt-4">
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.
            </div>

            {/* 2 btns*/}
            <div className="flex flex-row gap-3 mt-8">
              <CTAButton linkto={"/signup"} active={true}>
                Learn More
              </CTAButton>
              <CTAButton linkto={"/login"}>Book A demo</CTAButton>
            </div>

            {/* video */}
            <div className="mx-3 my-12 shadow-2xl  shadow-blue-200">
              <video muted loop autoPlay>
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
                    <HighlightText text={"Coding Potential \n"} />
                    with our onlince courses
                  </div>
                }
                subheading={
                  "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={{
                  linkto: "/signup",
                  active: true,
                  btntext: "Try it yourself",
                }}
                ctabtn2={{
                  linkto: "/login",
                  btntext: "Learn More",
                }}
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
                    <HighlightText text={"coding in"} />
                    <br />
                    <HighlightText text={"Seconds"} />
                  </div>
                }
                subheading={
                  "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson"
                }
                ctabtn1={{
                  linto: "/",
                  active: true,
                  btntext: "Continue Lesson",
                }}
                ctabtn2={{
                  linkto: "/",
                  btntext: "Learn More",
                }}
                codeblock={`import react from "react";\nimport CTAButton from "./Button";\nimport { FaArrowRight } from "react-icons/fa6";\nimport { TypeAnimation } from 'react-type-animation';\n \nconst home()=>{\nreturn home()\n}\n}`}
                codeColor={"text-richblack-300"}
              />
            </div>
            <ExploreMore />
          </div>

          {/* ----------------------- section-2 ------------------------------------------*/}
          {/* self try  */}
          <div className="bg-pure-greys-5 text-richblack-700 relative mx-auto  flex flex-col   w-11/12  max-w-maxContent items-center justify-between pb-12 ">
            {/* part-1 two buttons  */}
            <div className="bg-white w-[100%] homepage_bg h-[333px] flex text-center justify-center gap-4 pt-48">
              <CTAButton
                linkto={"/signup"}
                active={true}
                children={
                  <div className="flex justify-center gap-1">
                    <p>Explore Full Catelog</p> <FaArrowRight />
                  </div>
                }
              />
              <CTAButton linkto={"/signup"} children={"Learn More"} />
            </div>
            {/* part2 -heading and para   */}
            <div className="flex justify-between  gap-24 mt-20 mb-16 ">
              <div className="text-4xl font-bold ">
                <p>Get the skills you need for a </p>{" "}
                <HighlightText text={"job that is in demand"} />
              </div>
              <div className="flex flex-col gap-10">
                <div>
                  <p>
                    The modern Shiksha is the dictates its own terms. Today,
                  </p>{" "}
                  <p>
                    to be a competitive specialist requires more than
                    professional skills
                  </p>
                </div>
                <CTAButton
                  children={"Learn More "}
                  active={true}
                  linkto={"/"}
                />
              </div>
            </div>
            {/* iamge and role's  */}
            <div className="flex flex-row gap-8 justify-between ">
              <div className=" w-6/12 flex flex-col gap-10  ">
                <RecBox
                  heading={"Leadership"}
                  description={"Fully committed to the success company"}
                  logo={logoone}
                />
                <RecBox
                  heading={"Responsibility"}
                  description={"Students will always be our top priority"}
                  logo={logotwo}
                />
                <RecBox
                  heading={"Flexibilty"}
                  description={"The ability to switch is an important skills"}
                  logo={logothree}
                />
                <RecBox
                  heading={"Solve the Problem"}
                  description={"Code your way to a solution"}
                  logo={logofour}
                />
              </div>
              {/* image  */}
              <div className="w-6/12   flex justify-center items-center flex-col">
                <div className="shadow-2xl  shadow-blue-200">
                  <img src={imageno1} alt="computer" />
                </div>
                <div className="h-[120px] w-[90%] flex text-white text-1.5xl relative bottom-10  justify-center gap-40 text-bolds bg-caribbeangreen-700">
                  <div className=" flex gap-5 pl-4 items-center">
                    <h1 className="text-2xl font-extrabold">10</h1>
                    <div className="text-richblack-300">
                      <h1>Years</h1>
                      <h1>Experince</h1>
                    </div>
                  </div>
                  <div className=" flex gap-5 items-center">
                    <h1 className="text-2xl font-extrabold">250</h1>
                    <div className="text-richblack-300">
                      <h1>Types</h1>
                      <h1>of Courses</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* next headline  */}
            <div className="mt-6 mb-5">
              <div className="text-4xl font-bold  mb-2">
                <p>
                  Your swiss knife for{" "}
                  <HighlightText text={"learning any language"} />
                </p>
              </div>
              <div className=" text-center">
                {" "}
                <p>
                  Using spin making learning multiple languages easy. with 20+
                  languages realistic voice-over, progress tracking,
                  <br /> custom schedule and more.
                </p>
              </div>
            </div>
            {/* 3images */}
            <div className="flex justify-between font-1.3xl">
              <div>
                <img className="relative left-16" src={imgonee} alt="1st" />
              </div>
              <div>
                <img className="relative " src={imgtwo} alt="2nd" />
              </div>
              <div>
                <img src={imgthree} className="relative right-32" alt="3rd" />
              </div>
            </div>
            {/* last btn  */}
            <CTAButton active={true} children={"Learn More"} />
          </div>
          {/* --------------------------------section-3---------------------------------- */}
          <div className="w-11/12 max-w-maxContent mx-auto text-richblack-300 pt-16 pl-8 ">
            {/* part-1 */}
            <div className="flex gap-24 justify-between">
              {/* image div  */}
              <div>
                <img
                  className="w-[32rem] h-[26rem]"
                  src={instructorimg}
                  alt="instructore image"
                />
              </div>
              {/* info div  */}
              <div className="flex w-[50%] mt-12 gap-10  flex-col">
                <div className="text-5xl font-bold">
                  <p>Become an</p> <HighlightText text={"instructor"} />
                </div>
                <div className="text-2xl">
                  <p>
                    Instructors from around the world teach millions of students
                    on Shiksha. We provide the tools and skills to teach what
                    you love.
                  </p>
                </div>
                <CTAButton
                  active={true}
                  linkto={"/signup"}
                  children={
                    <div className="flex font-bold text-1.3xl">
                      <p>Start Teaching Today </p>
                      <FaArrowRight />
                    </div>
                  }
                />
              </div>
            </div>

            {/* part2  reviews */}
            <div>
              <div className="text-4xl font-semibold text-white text-center mt-12">
                <p>Review from others learners</p>
              </div>
              <div>
                <p>review of useres</p>
              </div>
            </div>
          </div>
          {/* footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Home;

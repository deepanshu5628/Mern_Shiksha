import HighlightText from "./HighlightText";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import { useState } from "react";
let tabdata=HomePageExplore;
function ExploreMore(){
    let [currtab,setcurrtab]=useState(tabdata[0].tag);
    let [showndata,setshowndata]=useState(tabdata[0]);
    function setmycard(idx){
        setcurrtab(tabdata[idx].tag);
        setshowndata(tabdata[idx]);
    }
    return (
        <div className="flex  flex-col items-center relative top-32 z-50 ">
            <p className=" text-xl  md:text-4xl font-semibold text-center ">Unlock the <HighlightText text={"Power of Code "}/></p>
            <p className="text-richblack-300 text-sm text-[16px]  mt-3">Learn to Build Anything You Can Imagine</p>
            
            <div className=" md:flex md:flex-row gap-6 rounded-md md:rounded-full bg-richblack-800 mt-5 mb-5 border-richblack-100 px-4 py-1">
                {
                    tabdata.map((element,index)=>{
                        return <div key={index} className={
                            `text-[16px] flex flex-row items-center gap-2 rounded-full transition-all duration-200 cursor-pointer hover:bg-ring-richblack-900
                            hover:text-richblack-5 px-7 py-2
                            ${element.tag===currtab ?
                            "bg-richblack-900 text-richblack-5 font-medium":"text-richblack-200"}`} onClick={()=>setmycard(index)} >
                            <p>{element.tag}</p>
                        </div>
                    })
                }
            </div>

            {/* section 2  */}
               <div className="  flex flex-col   lg:flex-row  gap-10 mt-4 w-11/12">
                {
                    showndata.courses.map((element,index)=>{
                        return <CourseCard key={index} setCurrentCard={setmycard} currentCard={showndata} cardData={element}/>
                    })
                }
               </div>
        </div>

    )
}

export default ExploreMore;




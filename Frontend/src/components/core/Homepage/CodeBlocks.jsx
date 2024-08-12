import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';
function CodeBlocks ({position,heading,subheading,ctabtn1,ctabtn2,codeblock,backgroundGradiant,codeColor}){
    return (
        <div className={`flex flex-col md:flex-row ${position} my-20 justify-between gap-10`}>
            {/* section 1  */}
        <div className="lg:w-[50%] flex flex-col gap-8 ">
                {heading}
            <div className="text-richblack-300 font-blod">
            {subheading}    
            </div>
            <div className="flex gap-7 mt-7">
                <CTAButton linkto={ctabtn1.linkto} active={ctabtn1.active}>
                    <div className="flex gap-2 items-center">
                    <p>{ctabtn1.btntext}</p>
                    <FaArrowRight />
                    </div>
                    </CTAButton>
                <CTAButton linkto={ctabtn2.linkto}>{ctabtn2.btntext}</CTAButton>
            </div>
        </div>
        {/* section 2  */}
        <div className="flex flex-row border border-zinc-400  code-border min-h-fit w-[100%] lg:w-[50%] text-10[px] pb-5  py-4 lg-w-[500px]">
            <div className="w-[10%] text-center flex flex-col text-richblack-400 select-none  font-inter font-bold">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
            <TypeAnimation
                style={{ whiteSpace: 'pre-line', height: '195px', display: 'block',  }}
                sequence={[codeblock,1000,""]}
                repeat={Infinity}
                omitDeletionAnimation={true}
            />
            </div>  
        </div>
        </div>

        
    )
}

export default CodeBlocks;
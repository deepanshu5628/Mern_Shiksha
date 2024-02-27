function HighlightText({text,textcolor}){
    return (
        <span className={` font-bold text-${textcolor}  
        bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] 
        text-transparent bg-clip-text `}>
             {" "}{text}
        </span>
    )
}

export default HighlightText;
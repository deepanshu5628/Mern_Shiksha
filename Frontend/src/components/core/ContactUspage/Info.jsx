function Info({logo,heading,des1,des2}){
    return (
        <div className="p-5 pl-7">
            <div className="flex items-center gap-1">{logo} <p>{heading}</p></div>
            <div><p className="text-xs mb-1 text-richblack-50">{des1} </p></div>
            <div className="text-xs text-richblack-50">{des2}</div>
        </div>
    )
}

export default Info;
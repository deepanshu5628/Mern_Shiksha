function RecBox({heading,logo="lsadf",description}){
    return (
        <div className="flex justify-between md:justify-start gap-4 md:gap-10 min-w-fit  items-center">
            {/* logo div */}
            <div >
                <img src={logo} alt="logo"  className="h-12 w-12  md:h-10 md:w-10"/>
            </div>
            {/* info dic */}
            <div className="flex flex-col justify-center">
                <h2 className="font-semibold text-2xl">{heading}</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default RecBox;
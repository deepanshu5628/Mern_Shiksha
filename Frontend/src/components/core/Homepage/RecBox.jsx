function RecBox({heading,logo="lsadf",description}){
    return (
        <div className="flex gap-10  items-center">
            {/* logo div */}
            <div>
                <img src={logo} alt="logo" />
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
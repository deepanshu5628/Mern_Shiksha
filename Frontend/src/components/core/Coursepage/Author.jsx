function Author({coursedetails}) {
    return (
        <section className="my-5   px-1 ">
            <p className="text-4xl  my-4 font-semibold ">Author</p>
            <div className="flex items-center gap-3">
                <img className="rounded-full" src={coursedetails.Instructor.image} alt="author image" />
                <p className="text-2xl font-bold"> <i> {coursedetails.Instructor.firstName} {coursedetails.Instructor.lastName} </i></p>
            </div>
        </section>
    )
}
export default Author;
function CourseIntro({coursedetails}) {
    return (
        <section className="flex-col p-6 justify-center bg-richblack-800">
            <p className="text-4xl my-2 font-bold">{coursedetails.courseName}</p>
            <p className="text-lg my-2 text-richblack-200 w-[70%]">{coursedetails.courseDescription}</p>
            <p className="text-lg my-2">Created By {coursedetails.Instructor.firstName} {coursedetails.Instructor.lastName}</p>
            <p className="text-lg my-2">Created On {coursedetails.createdAt.slice(0, 10)}  </p>
        </section>
    )
}

export default CourseIntro;
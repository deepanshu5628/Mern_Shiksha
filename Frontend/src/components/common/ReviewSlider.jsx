import Swiper from 'swiper';
import Rating from 'react-animated-rating';

import 'swiper/css';
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },


});
// const swiper = new Swiper(...)
import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import { FetchReviews } from "../../services/operations/courseDetailsAPI"
import { review } from '../../services/apis';
function ReviewSlider() {
    let [reviews, setreviews] = useState(null);
    let [loading, setloading] = useState(false);
    // console.log(reviews)
    let fetchreviewdetail = async () => {
        setloading(true)
        try {
            let res = await FetchReviews();
            // console.log(res);
            if (res.success) {
                // toast.success(res.message);
                setreviews(res.allratings);
            }
            if (!res.success) {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("error in fetching Review from DB")
            toast.error(error.message);
        }
        setloading(false);
    }

    useEffect(() => {
        fetchreviewdetail();
    }, [])
    return (
        <>
            {
                loading ? (<div className="loader"></div>) : (
                    <div className="flex    overflow-auto scroll-auto  swiper">
                        {
                            reviews !== null && reviews.length > 0 && reviews.map((rev,index) => {
                                return <div key={index} className="min-w-fit w-[10%] flex-col rounded-lg my-10 p-2 mr-8  mx-2 min-h-fit bg-yellow-800 swiper-slide ">
                                    <div className='flex'>
                                        <img className='rounded-full w-16 h-16' src={rev.user.image} alt="img" />
                                        <div className='flex-col text-lg'>
                                            <p>{rev.user.firstName} {rev.user.lastName}</p>
                                            <p>{rev.course.courseName}</p>
                                        </div>
                                    </div>
                                    <p className='text-richblack-50 text-sm my-3'>{rev.review.substr(0,50)}...</p>
                                   <p className='flex gap-3 text-lg pl-4 text-yellow-50'> {rev.rating}  <Rating
                                        count={5}
                                        filled={rev.rating}
                                    /></p>
                                </div>
                            })
                        }
                    </div>
                )
            }
        </>

    )
}

export default ReviewSlider;
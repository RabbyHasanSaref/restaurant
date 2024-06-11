import SectionTitle from "../../../Components/Section/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Testimonial = () => {
    const [review, setReview] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/review')
            .then(res => res.json())
            .then(data => {
                setReview(data)
            })
    }, [])
    return (
        <section className="my-10">
            <SectionTitle
                subHeading={"---What Our Clients Say---"}
                Heading={"TESTIMONIALS"}
            ></SectionTitle>

            <div className="mt-5">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        review.map(rev => <SwiperSlide key={rev._id}>
                            <div className="flex flex-col justify-center items-center px-20">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={3}
                                    readOnly
                                />
                                <p className="mt-5">{rev.details}</p>
                                <h2 className="text-2xl text-orange-500 mt-5">{rev.name}</h2>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonial;
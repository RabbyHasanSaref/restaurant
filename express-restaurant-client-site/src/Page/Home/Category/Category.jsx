import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import slider1 from '../../../assets/home/slide1.jpg'
import slider2 from '../../../assets/home/slide2.jpg'
import slider3 from '../../../assets/home/slide3.jpg'
import slider4 from '../../../assets/home/slide4.jpg'
import slider5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../Components/Section/SectionTitle';


const Category = () => {
    return (
        <section>
            <SectionTitle 
            subHeading={"From 11:00am to 10:00pm"}
            Heading={"ORDER ONLINE"}
            ></SectionTitle>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img className='lg:w-[410px]' src={slider1} alt="" />
                    <h2 className='lg:text-4xl text-white uppercase text-center -mt-16 border-2 '>Salads</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='lg:w-[410px]' src={slider2} alt="" />
                    <h2 className='lg:text-4xl text-white uppercase text-center -mt-16 '>pizzas</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='lg:w-[410px]' src={slider3} alt="" />
                    <h2 className='lg:text-4xl text-white uppercase text-center -mt-16 '>Soups</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='lg:w-[410px]' src={slider4} alt="" />
                    <h2 className='lg:text-4xl text-white uppercase text-center -mt-16 '>desserts</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='lg:w-[410px]' src={slider5} alt="" />
                    <h2 className='lg:text-4xl text-white uppercase text-center -mt-16 '>Salads</h2>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category;
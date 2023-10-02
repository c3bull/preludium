import 'swiper/css';
import 'swiper/css/effect-fade';
import React from 'react';
import { Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {imageUrl} from "../utils/Image";

export default function HomeSwiper() {
    return (
        <Swiper
            className="swiper--after relative max-h-[85vh] w-full"
            modules={[Autoplay, EffectFade]}
            slidesPerView={1}
            autoplay={{ delay: 1500 }}
            loop={true}
            effect="fade"
            speed={1500}
        >
            <SwiperSlide>
                <div className="aspect-video w-full">
                    <img
                        src={imageUrl('slides/slide1.jpg')}
                        alt='slide 1'
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="aspect-video w-full">
                    <img
                        src={imageUrl('slides/slide2.jpg')}
                        alt='slide 2'
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="aspect-video w-full">
                    <img
                        src={imageUrl('slides/slide3.jpg')}
                        alt='slide 3'
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="aspect-video w-full">
                    <img
                        src={imageUrl('slides/slide4.jpg')}
                        alt='slide 4'
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="aspect-video w-full">
                    <img
                        src={imageUrl('slides/slide5.jpg')}
                        alt='slide 5'
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="aspect-video w-full">
                    <img
                        src={imageUrl('slides/slide6.jpg')}
                        alt='slide 6'
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="aspect-video w-full">
                    <img
                        src={imageUrl('slides/slide7.jpg')}
                        alt='slide 7'
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="aspect-video w-full">
                    <img
                        src={imageUrl('slides/slide8.jpg')}
                        alt='slide 8'
                    />
                </div>
            </SwiperSlide>
        </Swiper>
    );
}

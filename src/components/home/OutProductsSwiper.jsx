import 'swiper/css';
import shuffle from 'lodash/shuffle';
import React, {useEffect, useState} from 'react';
import {Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import SectionHeader from "../common/SectionHeader";
import {imageUrl} from "../utils/Image";
import {gql, useQuery} from "@apollo/client";


const GET_ALL_PRODUCTS = gql`
  query GetProducts {
    product {
      id
    bottle
    number
    }
  }
`;

export default function OurProductsSwiper({goToProducts}) {
    const {data} = useQuery(GET_ALL_PRODUCTS);

    return (
        <div className="m-0 flex justify-center">
            <div className="flex w-2/3 flex-col items-center pb-10">
                <SectionHeader
                    icon={<img
                        src={imageUrl('icons/IoWaterOutline.png')}
                        width='50px'
                        height='50px'
                        alt='nasze produkty'
                    />}>
                    Nasze Produkty
                </SectionHeader>
                <Swiper
                    className="relative max-h-[90vh] w-full"
                    modules={[Autoplay]}
                    slidesPerView={8}
                    autoplay={{delay: 1300}}
                    loop={true}
                    speed={500}
                >
                    {data && shuffle(data.product).map((item) => {
                        return (
                            <SwiperSlide key={item.id}>
                                <img
                                    src={imageUrl(`bottles/${item.bottle}.png`)}
                                    onClick={goToProducts}
                                    alt="butelka"
                                    className="cursor-pointer"
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}

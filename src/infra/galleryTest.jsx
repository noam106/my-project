import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import ItemExpended from '../itemView/ItemExpended';

export default function Gallery({items, loadMore}) {
    const {count, next, results} = items
    console.log('from gallrey', items.results)

    const clothes = results.map((item) => {
        return <ItemExpended key={item.id} item={item} />
            })
    return( 
<>
<Swiper
  slidesPerView={1}
  spaceBetween={10}
  pagination={{
    clickable: true,
  }}
  breakpoints={{
    '@0.00': {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    '@0.75': {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    '@1.00': {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    '@1.50': {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  }}
  modules={[Pagination]}
  className="mySwiper"
>
  {clothes}
  {/* <SwiperSlide>
    <ItemExpended />
  </SwiperSlide>
  <SwiperSlide>
    <ItemExpended/>
  </SwiperSlide>
  <SwiperSlide>Slide 3</SwiperSlide>
  <SwiperSlide>Slide 4</SwiperSlide>
  <SwiperSlide>Slide 5</SwiperSlide>
  <SwiperSlide>Slide 6</SwiperSlide>
  <SwiperSlide>Slide 7</SwiperSlide>
  <SwiperSlide>Slide 8</SwiperSlide>
  <SwiperSlide>Slide 9</SwiperSlide> */}
</Swiper>
</>
   )
}
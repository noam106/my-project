import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './styles.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import required modules
import { Pagination } from 'swiper/modules';
import ItemExpended from '../itemView/ItemExpended';
import { ITEM_LIST_URL } from '../infra/Urls';
import axios from 'axios';
import { useEffect } from 'react';

export default function FilteredGallery({filters={}}) {
    
    const [items, setItems] = useState({results:[]})
    const {count, next, results} = items
    console.log('from gallrey', items.results)

    const fetchData = async () => {
        let urlToSend = ITEM_LIST_URL
        if (items.results.length > 0) {
            urlToSend = items.next
        }
        try {
            const response = await axios.get(urlToSend, {params: filters})
            setItems(
                {...items,
                next: response.data.next,
                results: [...items.results, ...response.data.results]
            }
            )
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(
        () => {
            fetchData()
        }
        ,[]
    )

    const clothes = results.map((item) => {
        return <SwiperSlide style={{background:'transparent',width:'fit-content'}}><ItemExpended key={item.id} item={item} /></SwiperSlide> 
  })

      return  <Swiper
      spaceBetween={50}
      pagination={{ clickable: true }}
      slidesPerView={3}
      modules={[Pagination]}
      className='swiper'
      onReachEnd={fetchData}
      slidesPerGroup={5}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {clothes}
      </Swiper>
//     return( 
// <>
// <Swiper
//   slidesPerView={1}
//   spaceBetween={10}
//   pagination={{
//     clickable: true,
//   }}
//   breakpoints={{
//     '@0.00': {
//       slidesPerView: 1,
//       spaceBetween: 10,
//     },
//     '@0.75': {
//       slidesPerView: 2,
//       spaceBetween: 20,
//     },
//     '@1.00': {
//       slidesPerView: 3,
//       spaceBetween: 40,
//     },
//     '@1.50': {
//       slidesPerView: 4,
//       spaceBetween: 50,
//     },
//   }}
//   modules={[Pagination]}
//   className="mySwiper"
// >
//   {/* <SwiperSlide>
//     <ItemExpended />
//   </SwiperSlide>
//   <SwiperSlide>
//     <ItemExpended/>
//   </SwiperSlide>
//   <SwiperSlide>Slide 3</SwiperSlide>
//   <SwiperSlide>Slide 4</SwiperSlide>
//   <SwiperSlide>Slide 5</SwiperSlide>
//   <SwiperSlide>Slide 6</SwiperSlide>
//   <SwiperSlide>Slide 7</SwiperSlide>
//   <SwiperSlide>Slide 8</SwiperSlide>
//   <SwiperSlide>Slide 9</SwiperSlide> */}
// </Swiper>
// </>
//    )
// }
}
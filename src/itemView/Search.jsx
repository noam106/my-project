import React, { useRef, useState,useEffect } from 'react';
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
import { useNavigate,useLocation } from 'react-router-dom';
const Search = () => {

    const {state} = useLocation()
    const [results,setResults] = useState([])
    const nav = useNavigate()
    useEffect(() => {
        if(state) {
         setResults(state.results)
        } else nav("/")
    },[state])
    
    
    
    const clothes = results.map((item) => {
        return <SwiperSlide style={{background:'transparent'}}><ItemExpended key={item.id} item={item} /></SwiperSlide> 
  })

   return  <>
        <Swiper
        spaceBetween={50}
        pagination={{ clickable: true }}
        slidesPerView={3}
        modules={[Pagination]}
        className='swiper'
        slidesPerGroup={5}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        >
            {clothes}
      </Swiper>
      </>
}

export default Search
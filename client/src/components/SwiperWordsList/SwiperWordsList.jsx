import React, { useState } from 'react';
import {
  EffectCoverflow, Keyboard, Navigation, Pagination,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import WordsList from '../WordsList/WordsList';

function SwiperWordsList({ children }) {
  const [currentPlayer, setCurrentPlayer] = useState('');
  return (
    <Swiper
      speed={600}
      autoHeight={false}
      modules={[Navigation, Pagination, Keyboard, EffectCoverflow]}
      direction="horizontal"
      keyboard
      initialSlide={1}
      slidesPerView={1}
      coverflowEffect={{
        stretch: 1,
        modifier: 1,
      }}
      centeredSlides
      navigation
      pagination={{ clickable: true }}
      paginationType="bullets"
      slidesOffsetBefore={0}
      className="mySwiper"
    >
      <SwiperSlide>
        <WordsList />
      </SwiperSlide>
      )
      <SwiperSlide>
        <WordsList />
      </SwiperSlide>
      )
    </Swiper>
  );
}

export default SwiperWordsList;

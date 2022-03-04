import React, { useState } from 'react';
import {
  EffectCoverflow, Keyboard, Navigation, Pagination,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import controller from '../../../controllers/TrainController';
import imgBulls from '../../../images/bulls.png';
import imgCows from '../../../images/cows.png';
import cls from './rulesPage.module.css';

function RulesPage() {
  const [inputs, setInputs] = useState('');
  const [inputs2, setInputs2] = useState('');
  const [answer, setAnswer] = useState('');
  const [secret, setSecret] = useState('');
  let wordLength;
  const maxLength = 10;

  const inputsHandler2 = (e) => {
    if (e.target.value.length > maxLength) return;
    setSecret(e.target.value);
    wordLength = secret.length + 1;
    setInputs2(e.target.value);
  };
  const inputsHandler = (e) => {
    if (e.target.value.length > wordLength) return;
    setInputs(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setAnswer('');
    const suppose = inputs.toLowerCase();
    wordLength = secret?.length;

    const bulls = controller.checkBulls(secret, suppose);
    const cows = controller.checkCows(secret, suppose);
    let bullsWord; let
      cowsWord;
    if (bulls === 0 || bulls === 5 || bulls === 6 || bulls === 7 || bulls === 8 || bulls === 9 || bulls === 10) {
      bullsWord = 'быков';
    } else if (bulls === 1) {
      bullsWord = 'бык';
    } else {
      bullsWord = 'быка';
    }
    if (cows === 0 || cows === 5 || cows === 6 || cows === 7 || cows === 8 || cows === 9 || cows === 10) {
      cowsWord = 'коров';
    } else if (cows === 1) {
      cowsWord = 'корова';
    } else {
      cowsWord = 'коровы';
    }
    setAnswer(`В слове "${suppose.toUpperCase()}" ${bulls} ${bullsWord} и ${cows} ${cowsWord}`);
  };

  return (
    <div className={cls.rulesPage}>
      <Swiper
        speed={600}
        autoHeight={false}
        modules={[Navigation, Pagination, Keyboard, EffectCoverflow]}
        direction="horizontal"
        keyboard
        initialSlide={0}
        slidesPerView={1}
        centeredSlides
        navigation
        pagination={{ clickable: true }}
        paginationType="bullets"
        slidesOffsetBefore={0}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className={cls.pageWrap}>
            <div>
              Бык — это буква, которая есть в загаданном слове и стоит на своем месте.
            </div>
            <div>
              <img src={imgBulls} alt="" width="80%" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={cls.pageWrap}>
            <div>
              Корова — это буква, которая есть в загаданном слове, но стоит не на своем месте.
            </div>
            <div>
              <img src={imgCows} alt="" width="80%" />
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <button type="submit" className={cls.checkBtn}>Проверить!</button>
            <GoBack />
          </div>

        </form>
        {answer && (
          <div className={cls.error}>
            {answer}
          </div>
        )}
      </div>
    </>
  );
}

export default RulesPage;

import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cls from './ratingPage.module.css';
import api, { API_URL } from '../../../http';
import Gamer from './gamer/Gamer';
import {
  selectUserSlice,
} from '../../../store/reducers/userSlice';

function RatingPage() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    api.get('/users')
      .then((res) => {
        console.log(res.data);
        setUserList(res.data);
      });
  }, []);

  const slice = useSelector(selectUserSlice);

  const showMeHandler = (event) => {
    const elem = event.target.closest('#ratingBox').querySelector(`[data-id="${slice.userId}"]`);
    elem.classList.add('mySelf');
    elem.scrollIntoView();
    console.log(elem);
  };

  return (
    <div className={cls.ratingPage} id="ratingBox">
      <div className={cls.rating}>
        <header className={cls.head}>
          <div className={cls.name}>User</div>
          <div className={cls.score}>Score</div>
        </header>
        <div className={cls.userList}>
          {userList.map((item) => (
            <Gamer
              name={item.name}
              photo={item.photo}
              rating={item.rating}
              key={item.id}
              id={item.id}
            />
          ))}
        </div>
      </div>
      <div className={cls.buttons}>
        <Link to="/"><button type="button" className={cls.btn}>Back</button></Link>
        <button type="button" className={cls.btn} onClick={(event) => showMeHandler(event)}>Show me</button>
      </div>

    </div>
  );
}

export default RatingPage;

import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import cls from './ratingPage.module.css';
import api, { API_URL } from '../../../http';
import Gamer from './gamer/Gamer';
import {
  selectUserSlice,
  setUserList,
  userSlice,
} from '../../../store/reducers/userSlice';
import Loader from '../../loader/Loader';

function RatingPage() {
  const dispatch = useDispatch();
  const store = useSelector(selectUserSlice);
  const { setFetching } = userSlice.actions;

  useEffect(() => {
    setTimeout(() => {
      dispatch(setUserList());
    }, 2000);
    return () => dispatch(setFetching('fetching'));
  }, []);

  const slice = useSelector(selectUserSlice);

  const showMeHandler = (event) => {
    const elem = event.target.closest('#ratingBox').querySelector(`[data-id="${slice.userId}"]`);
    elem.classList.add('mySelf');
    elem.scrollIntoView();
    setTimeout(() => {
      elem.classList.remove('mySelf');
    }, 3000);
  };

  return (
    <div className={cls.ratingPage} id="ratingBox">
      <div className={cls.rating}>
        <header className={cls.head}>
          <div className={cls.name}>User</div>
          <div className={cls.score}>Score</div>
        </header>
        {store.fetch === 'fetching' && <Loader />}
        {store.fetch === 'done' && (
          <div className={cls.userList}>
            {store.userList.map((item) => (
              <Gamer
                name={item.name}
                photo={item.photo}
                rating={item.rating}
                key={item.id}
                id={item.id}
              />
            ))}
          </div>
        )}
        {store.fetch === 'err' && <span>Oшибка</span>}
      </div>
      <div className={cls.buttons}>
        <Link to="/"><button type="button" className={cls.btn}>Back</button></Link>
        <button type="button" className={cls.btn} onClick={(event) => showMeHandler(event)}>Show me</button>
      </div>

    </div>
  );
}

export default RatingPage;

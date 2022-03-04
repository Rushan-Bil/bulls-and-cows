import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import cls from './avatar.module.css';
import { API_URL } from '../../http';
import {
  selectUserSlice,
  userSlice,
} from '../../store/reducers/userSlice';
import { SERVER_URL } from '../../config';

function Avatar() {
  const dispatch = useDispatch();
  const { setPhoto } = userSlice.actions;
  function photoHandler(event) {
    event.target.nextSibling.click();
  }

  const slice = useSelector(selectUserSlice);

  function inputsHandler(event) {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    console.log(formData);
    axios.post(`${API_URL}/upload/${slice.userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log('GET RESPONSE+++++++++', res.data);
        dispatch(setPhoto(res.data.path));
      });
  }
  return (
    <div className={cls.avatarContainer}>
      <div className={cls.photo} style={{ backgroundImage: `url(${SERVER_URL}${slice.imgPath})` }} alt="avatar">
        <form>
          <button type="button" className="changePhoto" onClick={((event) => photoHandler(event))}>Сменить аватар</button>
          <input name="avatar" type="file" id="getFile" className={cls.getPhoto} onChange={(event) => inputsHandler(event)} />
        </form>
      </div>
      <p>{slice.userName}</p>
    </div>
  );
}

export default Avatar;

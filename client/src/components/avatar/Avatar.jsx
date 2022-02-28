import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import cls from './avatar.module.css';
import { API_URL } from '../../http';
import {
  selectUserSlice,
  userSlice,
} from '../../store/reducers/userSlice';

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
      <div className={cls.photo}>
        <img src={`http://localhost:3001${slice.imgPath}`} alt="" width="150px" height="150px" />
      </div>
      <div className={cls.infocontainer}>
        <h2>{slice.userName}</h2>
        <form>
          <button type="button" onClick={((event) => photoHandler(event))} className={cls.btnPhoto}>Сменить аватар</button>
          <input name="avatar" type="file" id="getFile" className={cls.getPhoto} onChange={(event) => inputsHandler(event)} />
        </form>
      </div>

    </div>
  );
}

export default Avatar;

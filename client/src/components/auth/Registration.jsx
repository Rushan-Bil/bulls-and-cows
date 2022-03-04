import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomError from '../CustomError/CustomError';
import {
  registrateUser,
  selectUserSlice,
  userSlice,
} from '../../store/reducers/userSlice';

function Authorisation() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const registrateHandler = (event) => {
    event.preventDefault();
    dispatch(registrateUser({ name, email, password }));
  };
  const errMessage = useSelector(selectUserSlice);
  const { setErrorMessageNull } = userSlice.actions;
  useEffect(() => () => dispatch(setErrorMessageNull()), []);

  return (
    <div className="registration">
      <div className="regForm">
        <h1 className="head">REGISTRATION</h1>
        <form onSubmit={(event) => registrateHandler(event)}>
          <input className="commonInput" value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя игрока" />
          <input className="commonInput" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Почта" />
          <input className="commonInput" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" type="password" />
          <h2 className={errMessage.isError ? 'warning' : undefined}>{errMessage.message}</h2>
          <div>
            <button type="submit" className="menuBtn">
              Registration
            </button>
          </div>
        </form>
      </div>
      <div>
        <CustomError selectState={selectUserSlice} />
      </div>
      <div>
        {errMessage.mailMessage}
      </div>
    </div>
  );
}

export default Authorisation;

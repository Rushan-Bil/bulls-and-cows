import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomError from '../CustomError/CustomError';
import {
  loginUser,
  selectUserSlice,
  userSlice,
} from '../../store/reducers/userSlice';

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  const { setErrorMessageNull } = userSlice.actions;
  useEffect(() => () => dispatch(setErrorMessageNull()), []);

  const errMessage = useSelector(selectUserSlice);

  return (
    <div className="registration">
      <div className="regForm">
        <h1 className="head">Вход</h1>
        <form className="form-registration" onSubmit={(event) => loginHandler(event)}>
          <input className="commonInput" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Почта" />
          <input className="commonInput" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" type="password" />
          <h2 className={errMessage.isError ? 'warning' : undefined}>{errMessage.isError && errMessage.message}</h2>
          <div>
            <button type="submit" className="menuBtn">
              Войти
            </button>
          </div>
        </form>
      </div>
      <div>
        <CustomError selectState={selectUserSlice} />
      </div>
    </div>
  );
}

export default Login;

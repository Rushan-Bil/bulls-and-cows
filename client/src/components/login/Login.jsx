import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  selectUserSlice,
} from '../../store/reducers/userSlice';

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const errMessage = useSelector(selectUserSlice);

  useEffect(() => {

  });

  return (
    <div className="registration">
      <div className="regForm">
        <h1 className="head">LOGIN</h1>
        <form onSubmit={(event) => loginHandler(event)}>
          <input className="commonInput" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Почта" />
          <input className="commonInput" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" type="password" />
          <h2 className={errMessage.isError && 'warning'}>{errMessage.isError && errMessage.message}</h2>
          <div>
            <button type="submit" className="menuBtn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

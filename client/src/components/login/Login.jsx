import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  loginUser,
  selectLetterSlice,
} from '../../store/reducers/lettersSlice';
import cls from './login.module.css';

function Login() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2),

      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '300px',
      },
      '& .MuiButtonBase-root': {
        margin: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const errMessage = useSelector(selectLetterSlice);

  return (
    <>
      <h1>LOGIN</h1>
      <form className={classes.root} onSubmit={(event) => loginHandler(event)}>
        <TextField
          label="Email"
          variant="filled"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <h2 className={errMessage.isError && cls.warning}>{errMessage.isError}</h2>
        <div>
          <Button type="submit" variant="contained" color="primary">
            LogIn
          </Button>
        </div>
      </form>
    </>
  );
}

export default Login;

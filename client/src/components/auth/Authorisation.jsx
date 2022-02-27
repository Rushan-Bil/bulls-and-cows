import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  registrateUser,
  selectLetterSlice,
} from '../../store/reducers/lettersSlice';
import cls from './authorization.module.css';

function Authorisation() {
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const registrateHandler = (event) => {
    event.preventDefault();
    dispatch(registrateUser({ name, email, password }));
  };
  const errMessage = useSelector(selectLetterSlice);

  return (
    <>
      <h1>REGISTRATION</h1>
      <form className={classes.root} onSubmit={(event) => registrateHandler(event)}>
        <TextField
          label="Name"
          variant="filled"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
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
        <h2 className={errMessage.isError && cls.warning}>{errMessage.isError ? errMessage.isError : 'Проверьте почту'}</h2>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Registration
          </Button>
        </div>
      </form>
    </>
  );
}

export default Authorisation;

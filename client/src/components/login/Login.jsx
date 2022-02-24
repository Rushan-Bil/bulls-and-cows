import React from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

  return (
    <>
      <h1>LOGIN</h1>
      <form className={classes.root}>
        <TextField
          label="Email"
          variant="filled"
          type="email"
          required
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          required
        />
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

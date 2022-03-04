/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cls from './style.module.css';
import { gameCompSlice, selectCompSlice } from '../../../../store/reducers/gameCompSlice';

export default function FinishGameDialog() {
  const { finishGame, gameResult } = useSelector(selectCompSlice);
  const [close, setClose] = useState(true);
  const { resetGame } = gameCompSlice.actions;
  const dispatch = useDispatch();
  const resetGameHandler = (e) => {
    e.preventDefault();
    dispatch(resetGame());
  };
  const handleClose = () => {
    setClose(false);
  };
  function countResult() {
    return gameResult === 'tie'
      ? 'Ничья!'
      : gameResult === 'userWin'
        ? 'Вы выиграли!'
        : 'К сожалению, вы проиграли';
  }
  return (
    <Modal
      open={close && finishGame}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={cls.modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Игра окончена!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          { countResult()}
        </Typography>
        <div className={cls.controls}>
          <Link className={cls.start} to="/">На главное меню</Link>
          <button className={cls.start} onClick={resetGameHandler}>Начать новую игру</button>
        </div>
      </Box>
    </Modal>
  );
}

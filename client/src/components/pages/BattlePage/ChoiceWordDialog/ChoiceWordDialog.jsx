import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cls from './style.module.css';
import { selectGameOnline } from '../../../../store/reducers/onlineGameSlice';

export default function ChoiceWordDialog() {
  const { finishGame, didWin } = useSelector(selectGameOnline);
  const [close, setClose] = useState(true);
  const handleClose = () => {
    setClose(false);
  };
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
          {didWin ? 'Вы выиграли!' : 'К сожалению вы проиграли'}
        </Typography>
        <div className={cls.controls}>
          <Link className={cls.start} to="/">На главное меню</Link>
          <Link className={cls.start} to="/game/prepare">Начать новую игру</Link>
        </div>
      </Box>
    </Modal>
  );
}

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import cls from '../../BattlePage/ChoiceWordDialog/style.module.css';
import { gameCompSlice } from '../../../../store/reducers/gameCompSlice';

export default function CompanyWordDialog() {
  const dispacth = useDispatch();
  const { setSecret } = gameCompSlice.actions;

  const [open, setOpen] = useState(true);
  const [input, setInput] = useState('');

  const handleInput = (e) => setInput(e.target.value);

  const handleStart = (e) => {
    e.preventDefault();
    dispacth(setSecret(input));
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={cls.modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Добро пожаловать в режим игры с ИИ!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Для начала игры загадайте слово и
          нажмите кнопку &ldquo;Старт!&rdquo;
        </Typography>
        <div className={cls.inputsWrap}>
          <input type="text" className="commonInput" value={input} onChange={handleInput} placeholder="Секретное слово" />
        </div>
        <form onSubmit={handleStart}>
          <button className={cls.start}>Старт!</button>
        </form>
      </Box>
    </Modal>
  );
}

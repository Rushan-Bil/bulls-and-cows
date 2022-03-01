import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import cls from './style.module.css';
import { trainSlice } from '../../store/reducers/trainSlice';
import { getSecret } from '../../store/reducers/actionCreators';

let wordL = 0;

function valuetext(value) {
  wordL = value;
  return value;
}

export default function StartModal({
  setLetterCount,
}) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleStart = () => {
    setLetterCount(` из ${wordL} букв `);
    dispatch(getSecret(wordL));
    setOpen(false);
  };
  const handleCansel = () => setOpen(false);

  return (
    <div>
      <button type="submit" onClick={handleOpen} className={cls.restart}>Начать новую игру</button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={cls.modalWrap}
      >
        <Box className={cls.modal}>
          <h2> Добро пожаловать в режим тренировки!</h2>
          <div>
            Для начала игры выберите количество букв в слове и
            нажмите кнопку &ldquo;Старт!&rdquo;
          </div>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Small steps"
              defaultValue={5}
              getAriaValueText={valuetext}
              step={1}
              marks
              min={3}
              max={8}
              valueLabelDisplay="auto"
            />
          </Box>
          <button type="submit" onClick={handleStart} className={cls.start}>Старт!</button>
          <Button onClick={handleCansel}>Отмена</Button>
        </Box>
      </Modal>
    </div>
  );
}

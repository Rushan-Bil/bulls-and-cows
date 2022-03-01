import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { trainSlice } from '../../store/reducers/trainSlice';
import cls from './style.module.css';

export default function PlayAgainModal({ setWords }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setOpen } = trainSlice.actions;
  const { setOpenStartModal } = trainSlice.actions;

  const open = useSelector((state) => state.trainSlice.open);
  const openStartModal = useSelector((state) => state.trainSlice.openStartModal);

  const handleStart = () => {
    setWords([]);
    dispatch(setOpen(false));
    dispatch(setOpenStartModal(true));
  };

  const handleCansel = () => {
    dispatch(setOpen(false));
    dispatch(setOpenStartModal(true));
    navigate('/');
  };
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={cls.modalWrap}
      >
        <Box className={cls.modal}>
          <h2> Поздравляем! Отличная игра!</h2>
          <div>
            Хотите сыграть еще раз?
          </div>
          <button type="submit" onClick={handleStart} className={cls.start}>Да!</button>
          <Button onClick={handleCansel}>Главное меню</Button>
        </Box>
      </Modal>
    </div>
  );
}

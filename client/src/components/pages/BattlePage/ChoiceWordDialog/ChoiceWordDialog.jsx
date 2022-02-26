import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { wordsSlice } from '../../../../store/reducers/wordSlice';
import cls from './style.module.css';

export default function ChoiceWordDialog() {
  const dispacth = useDispatch();
  const socket = useSelector((state) => state.wordsReducer.socket);
  const { setSecret, setUserId, setRoomId } = wordsSlice.actions;

  const [open, setOpen] = useState(true);
  const [input, setInput] = useState('');
  const [id, setId] = useState('');
  const [room, setRoom] = useState('');

  const handleInput = (e) => setInput(e.target.value);
  const handleId = (e) => setId(e.target.value);
  const handleRoomId = (e) => setRoom(e.target.value);

  const handleStart = () => {
    dispacth(setSecret(input));
    dispacth(setUserId(id));
    dispacth(setRoomId(room));
    socket.send(JSON.stringify({ type: 'SET_SECRET', payload: { secret: input.toLowerCase(), userId: id, roomId: room } }));
    setOpen(false);
  };
  const handleCansel = () => setOpen(false);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={cls.modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Добро пожаловать в режим соревнования!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Для начала игры загадайте слово и
          нажмите кнопку &ldquo;Старт!&rdquo;
        </Typography>
        <div className={cls.inputsWrap}>
          <input type="text" className="commonInput" value={input} onChange={handleInput} placeholder="Секретное слово" />
          <input type="number" className="commonInput" value={id} onChange={handleId} placeholder="UserId" />
          <input type="number" className="commonInput" value={room} onChange={handleRoomId} placeholder="RoomId" />
        </div>
        <button onClick={handleStart} className={cls.start}>Старт!</button>
      </Box>
    </Modal>
  );
}

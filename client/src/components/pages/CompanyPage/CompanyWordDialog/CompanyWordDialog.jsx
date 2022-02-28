import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cls from '../../BattlePage/ChoiceWordDialog/style.module.css';
import { gameCompSlice } from '../../../../store/reducers/gameCompSlice';
import gameController from '../../../../controllers/GameController';
import Letter from '../../../Letter/Letter';

export default function CompanyWordDialog() {
  const dispacth = useDispatch();
  const { setSecret } = gameCompSlice.actions;

  const [open, setOpen] = useState(true);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [removeError, setRemoveError] = useState(false);
  const errorRef = useRef(null);

  const handleErrorClass = () => (removeError
    ? [cls.error, cls.fadeOut].join(' ')
    : cls.error);

  const handleInput = (e) => {
    if (error && input.length >= 3) {
      setRemoveError(true);
      setTimeout(() => {
        setRemoveError(false);
        setError('');
      }, 500);
    }
    setInput(e.target.value);
  };

  const focusRef = useCallback((node) => {
    if (node !== null) {
      node.focus();
    }
  }, []);

  const handleStart = (e) => {
    e.preventDefault();
    if (!input) {
      setError('Слово должно содержать не менее 3 символов');
      return;
    }
    if (!gameController.checkIncludesWord(input.toLowerCase())) {
      setError('Такого слова нет в словаре');
      return;
    }
    dispacth(setSecret(input));
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={cls.modalWrap}
    >
      <div className={cls.modal}>
        <h2>Добро пожаловать в режим игры с ИИ!</h2>
        <p>
          Для начала игры загадайте слово и
          нажмите кнопку &ldquo;Старт!&rdquo;
        </p>
        <form onSubmit={handleStart} className={cls.inputsWrap}>
          <input ref={focusRef} type="text" className="commonInput" value={input} onChange={handleInput} placeholder="Секретное слово" />
          {error && <div ref={errorRef} className={handleErrorClass()}>{error}</div>}
          <button type="submit" className={cls.start}>Старт!</button>
        </form>
      </div>
    </Modal>
  );
}
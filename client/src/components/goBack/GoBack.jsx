import React from 'react';
import { useNavigate } from 'react-router-dom';
import cls from '../pages/BattlePage/ChoiceWordDialog/style.module.css';

function GoBack(props) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={cls.start}
      style={{ backgroundColor: 'rgba(255, 0, 0, 0.3)' }}
      onClick={() => navigate(-1)}
    >
      Назад

    </button>

  );
}

export default GoBack;

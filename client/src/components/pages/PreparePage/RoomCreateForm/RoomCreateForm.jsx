import React from 'react';
import GoBack from '../../../goBack/GoBack';
import cls from '../../BattlePage/ChoiceWordDialog/style.module.css';

function RoomCreateForm() {
  return (
    <div>
      <form>
        <input className="commonInput" type="text" placeholder="введите номер комнаты" required />
        <input className="commonInput" type="password" placeholder="введите пароль для комнаты" />
        <div style={{ display: 'flex' }}>
          <button className={cls.start}>Создать</button>
          <GoBack />
        </div>

      </form>
    </div>
  );
}

export default RoomCreateForm;

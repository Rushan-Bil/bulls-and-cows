import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { TransitionGroup } from 'react-transition-group';

function RoomCreateForm() {
  return (
    <div>
      <form>
        <input className="commonInput" type="text" placeholder="введите номер комнаты" required />
        <input className="commonInput" type="password" placeholder="введите пароль для комнаты" />
        <button>Создать</button>
      </form>
    </div>
  );
}

export default RoomCreateForm;

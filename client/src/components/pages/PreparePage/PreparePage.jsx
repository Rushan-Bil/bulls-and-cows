import React, { useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import CSSTransition from 'react-transition-group/CSSTransition';
import cls from './prepare.module.css';
import RoomCreateForm from './RoomCreateForm/RoomCreateForm';
import RandomCreateForm from './RandomCreateForm/RandomCreateForm';

function PreparePage() {
  const [showRoomSetting, setShowRoomSetting] = useState(false);
  const clickHandler = () => {
    setShowRoomSetting(!showRoomSetting);
  };

  return (
    <div className={cls.preparePage}>
      <div className={cls.formControl}>
        <div className={cls.controls}>
          <button
            type="button"
            className={cls.btn}
            onClick={clickHandler}
            disabled={!!showRoomSetting}
          >
            Создать комнату

          </button>
          <button
            type="button"
            className={cls.btn}
            onClick={clickHandler}
            disabled={!showRoomSetting}
          >
            Случайный поиск

          </button>
        </div>
        <TransitionGroup className={cls.transition}>
          <CSSTransition
            key={showRoomSetting}
            timeout={500}
            classNames="wordsList"
          >
            {showRoomSetting
              ? <RoomCreateForm />
              : <RandomCreateForm />}
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
}

export default PreparePage;

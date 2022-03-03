import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cls from '../prepare.module.css';
import ws from '../../../../socket/socket';
import { onlineGameSlice, selectGameOnline } from '../../../../store/reducers/onlineGameSlice';
import { selectUserSlice } from '../../../../store/reducers/userSlice';
import PrepareFormControl from '../PrepareFormControl/PrepareFormControl';

function RandomCreateForm() {
  const navigate = useNavigate();
  const { userId } = useSelector(selectUserSlice);
  const dispatch = useDispatch();
  const [searchingList, setSearchingList] = useState([]);
  const {
    setSocket, setLoading, setTurn, setGameId,
  } = onlineGameSlice.actions;
  useEffect(() => {
    dispatch(setSocket(ws));
    ws.send(JSON.stringify({ type: 'GET_ALL_SEARCHING', payload: {} }));
    ws.onmessage = (message) => {
      const { type, payload = {} } = JSON.parse(message.data);
      const { gameId, currentTurn, searchList } = payload;
      switch (type) {
        case 'UPDATE_SEARCHING':
          setSearchingList(() => searchList);
          return;
        case 'SEARCHING':
          dispatch(setLoading(true));
          return;
        case 'CONNECTED_GAME':
          dispatch(setTurn(currentTurn === userId));
          dispatch(setLoading(false));
          dispatch(setGameId(gameId));
          navigate(`/game/battle/${gameId}`);
          break;
        default:
          break;
      }
    };
    return () => {
      ws.send(JSON.stringify({ type: 'STOP_SEARCHING', payload: { userId } }));
      dispatch(setLoading(false));
    };
  }, []);
  return (
    <div className={cls.randomWrap}>
      <div className={cls.onlineData}>
        <table>
          <thead>
            <th>Username</th>
            <th>Количество букв</th>
            <th>Язык</th>
          </thead>
          <tbody>
            {searchingList.map((item) => (
              <tr key={item.userId}>
                <td>{item.userName}</td>
                <td>{item.word.length}</td>
                <td>{item.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PrepareFormControl />
    </div>
  );
}

export default RandomCreateForm;

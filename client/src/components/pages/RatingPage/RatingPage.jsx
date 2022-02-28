import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cls from './ratingPage.module.css';
import api, { API_URL } from '../../../http';
import Gamer from './gamer/Gamer';

function RatingPage() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    api.get('/users')
      .then((res) => {
        console.log(res.data);
        setUserList(res.data);
      });
  }, []);

  return (
    <div className={cls.ratingPage}>
      <div className={cls.rating}>
        <header className={cls.head}>
          <div className={cls.name}>User</div>
          <div className={cls.score}>Score</div>
        </header>
        <div className={cls.userList}>
          {userList.map((item) => (
            <Gamer
              name={item.name}
              photo={item.photo}
              rating={item.rating}
              key={item.id}
            />
          ))}
        </div>
      </div>
      <div className={cls.buttons}>
        <Link to="/"><button type="button" className={cls.btn}>Back</button></Link>
        <button type="button" className={cls.btn}>Show me</button>
      </div>

    </div>
  );
}

export default RatingPage;

import React from 'react';
import OneWord from '../pages/OneWord/OneWord';

function WordsList({ words }) {
  return (
    <div className="flex-d-c">
      <table className="table">
        <thead>
          <th className="major">Слово</th>
          <th className="minor">Быков</th>
          <th className="minor">Коров</th>
        </thead>
        <tbody>
          {words && words?.map((el) => <OneWord key={el.word} {...el} />)}
        </tbody>
      </table>
    </div>
  );
}

export default WordsList;

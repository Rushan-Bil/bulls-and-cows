import React from 'react';
import OneWord from '../pages/OneWord/OneWord';
// import OneWord from '../pages/OneWord/OneWord';

function WordsList({ words }) {
  return (
    <div className="flex-d-c column-3">
      <table>
        <thead>
          <th>Слово</th>
          <th>Быков</th>
          <th>Коров</th>
        </thead>
        <tbody>
          <tr>
            <td>Кисель</td>
            <td>0</td>
            <td>3</td>
          </tr>
          {words && words?.map((el) => <OneWord {...el} />)}
        </tbody>
      </table>
    </div>
  );
}

export default WordsList;

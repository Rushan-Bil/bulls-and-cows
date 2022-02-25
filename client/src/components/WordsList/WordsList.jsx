import React from 'react';
// import OneWord from '../pages/OneWord/OneWord';

function WordsList() {
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
          {/* <tr>
            {words && words?.map((el) => <OneWord />)}
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default WordsList;

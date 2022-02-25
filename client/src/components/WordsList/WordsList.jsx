import React from 'react';

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
        </tbody>
      </table>
    </div>
  );
}

export default WordsList;

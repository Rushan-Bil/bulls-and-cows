import React from 'react';

function OneWord({ word, bulls, cows }) {
  return (
    <tr>
      <td>{word}</td>
      <td>{bulls}</td>
      <td>{cows}</td>
    </tr>
  );
}

export default OneWord;

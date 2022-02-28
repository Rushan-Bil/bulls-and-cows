import React from 'react';
import WordsListLetter from '../../WordsList/WordsListLetter/WordsListLetter';

function OneWord({
  word, bulls, cows, type,
}) {
  return (
    <tr>
      <td>{word.split('').map((letter) => <WordsListLetter value={letter} type={type} />)}</td>
      <td>{bulls}</td>
      <td>{cows}</td>
    </tr>
  );
}

export default OneWord;

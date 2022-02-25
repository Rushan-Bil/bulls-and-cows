import React, { useState } from 'react';
import AlphabetLetter from '../AlphabetLetter/AlphabetLetter';
import cls from './alphabet.module.css';

function Alphabet({ arrLetter }) {
  const AB = 'йцукенгшщзхъфывапролджэячсмитьбю'.split('').sort();
  const [alphabet, setAlphabet] = useState(AB);
  return (
    <div className={`${cls.alphabet}`}>
      {alphabet.map((letter) => <AlphabetLetter value={letter} />)}
    </div>
  );
}

export default Alphabet;

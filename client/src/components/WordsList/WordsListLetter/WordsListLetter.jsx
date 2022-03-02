/* eslint-disable consistent-return */
import React from 'react';
import { useSelector } from 'react-redux';

function WordsListLetter({ value, type }) {
  const { wrong, doubt, correct } = useSelector((state) => state.letterReducer);
  function setClass() {
    if (type !== 'myWords') return;
    if (wrong.includes(value)) return 'wrong';
    if (doubt.includes(value)) return 'doubt';
    if (correct.includes(value)) return 'correct';
  }
  return (
    <span className={setClass()}>{value}</span>
  );
}

export default WordsListLetter;

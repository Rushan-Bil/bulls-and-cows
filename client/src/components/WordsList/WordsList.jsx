import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import OneWord from '../pages/OneWord/OneWord';
import Loader from '../loader/Loader';

function WordsList({
  words, type, letterCount, isLoading,
}) {
  return (
    <TransitionGroup className="flex-d-c pos-r tableWrap">
      <CSSTransition
        key={type ?? words}
        timeout={500}
        classNames="wordsList"
      >
        <>
          <table className="table">
            <thead>
              <th className="major">
                Слово
                {letterCount}
              </th>
              <th className="minor">Б</th>
              <th className="minor">К</th>
            </thead>
            <tbody>
              {words && words?.map((el) => <OneWord key={el.word} {...el} type={type} />)}
            </tbody>
          </table>
          {isLoading && (
          <Loader/>
          )}
        </>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default WordsList;

import React, { useState, useCallback } from 'react';
import controller from '../../controllers/TrainController';

function WordInput({ secret, setWords }) {
  const wordLength = secret?.length;

  const [inputs, setInputs] = useState('');

  const inputsHandler = (e) => {
    if (e.target.value.length > wordLength) return;
    setInputs(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const suppose = inputs;
    setInputs('');

    if (suppose?.length === wordLength) {
      const bulls = controller.checkBulls(secret, suppose);
      const cows = controller.checkCows(secret, suppose);
      setWords((prev) => ([...prev, { word: suppose, bulls, cows }]));
    } else {
      alert('Введите слово целиком');
    }
  };

  return (
    <div className="inputForm">
      <form onSubmit={submitHandler}>
        <div className="">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="inputForm" className="form-label">Введите своё слово:</label>
          <div>
            <input
              type="text"
              className="form-control"
              id="inputSuppose"
              // pattern="[А-Яа-яЁё ]+" // ТАК СЕБЕ ВАРИАНТ
              // placeholder="Только русские буквы" // ТАК СЕБЕ ВАРИАНТ
              name="suppose"
              onChange={inputsHandler}
              value={inputs}
            />
          </div>
        </div>
        <button type="submit">Проверить!</button>
      </form>
    </div>
  );
}

export default WordInput;

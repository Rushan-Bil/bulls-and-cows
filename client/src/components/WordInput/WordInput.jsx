import React, { useState, useCallback } from 'react';
import controller from '../../controllers/TrainController';

function WordInput() {
  const secret = 'qwert';
  const wordLength = secret.length;

  const [inputs, setInputs] = useState({});
  const [words, setWords] = useState([]);

  const inputsHandler = useCallback((e) => {
    if (e.target.value.length <= wordLength) {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    let suppose = '';
    suppose = inputs.suppose;
    setInputs({});

    if (suppose?.length === wordLength) {
      console.log(secret);
      console.log(suppose);
      const bulls = controller.checkBulls(secret, suppose);
      const cows = controller.checkCows(secret, suppose);
      console.log(bulls, 'bulls');
      console.log(cows, 'cows');
      setWords((prev) => ([...prev, { word: suppose, bulls, cows }]));
    } else {
      alert('Введите слово целиком');
    }
  };
  console.log(words);

  return (
    <div className="inputForm">
      <form onSubmit={submitHandler}>
        <div className="">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="exampleFormControlInput1" className="form-label">Введите своё слово:</label>
          <div>
            <input
              type="text"
              className="form-control"
              id="inputSuppose"
              // pattern="[А-Яа-яЁё ]+" // ТАК СЕБЕ ВАРИАНТ
              // placeholder="Только русские буквы" // ТАК СЕБЕ ВАРИАНТ
              name="suppose"
              onChange={inputsHandler}
              value={inputs.suppose || ''}
            />
          </div>
        </div>
        <button type="submit">Проверить!</button>
      </form>
    </div>
  );
}

export default WordInput;

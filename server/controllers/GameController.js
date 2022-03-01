const dictionary = require('../dictionaries/dictionary');

class GameController {
  transformWordToArr(word) {
    return word.toLowerCase().split('').map((letter, index) => ({
      letter, checked: false, position: index,
    }));
  }

  checkSameLength(guessWord, hiddenWord) {
    return guessWord.length === hiddenWord.length;
  }

  countBullandCows(guessWord = '', hiddenWord = '') {
    if (!this.checkSameLength(guessWord, hiddenWord)) return null;
    const prepareGuess = this.transformWordToArr(guessWord);
    const prepareHidden = this.transformWordToArr(hiddenWord);

    const result = {
      word: guessWord,
      bulls: 0,
      cows: 0,
    };

    for (let i = 0; i < prepareGuess.length; i++) {
      const current = prepareGuess[i];

      if (current.letter === prepareHidden[i].letter) {
        result.bulls += 1;
        prepareHidden[i].checked = true;
        current.checked = true;
        continue;
      }
      const index = prepareHidden.findIndex((item) => item.letter === current.letter && !item.checked);
      if (index === -1) continue;

      result.cows += 1;
      prepareHidden[index].checked = true;
      current.checked = true;
    }

    return result;
  }
}
const alex = new GameController();
alex.countBullandCows('акколада', 'акваланг'); // ?
// alex.computerGuessingWord('акваланг', dictionary); // ?
module.exports = new GameController();

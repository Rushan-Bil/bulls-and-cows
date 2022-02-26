const dictionary = require('../dictionaries/dictionary');

class GameController {
  transformWordToArr(word) {
    return word.split('').map((letter, index) => ({
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

  countBull(guessWord, hiddenWord) {
    return guessWord.split('').filter((item, index) => hiddenWord[index] === item).length;
  }

  getRandomWord(dict) {
    const randomIndex = Math.floor(Math.random() * dict.length);
    return dict[randomIndex];
  }

  computerGuessingWord(word, dict) {
    if (!dict.includes(word)) return 'Слово не найдено в словаре';

    const currentDictionary = dict.filter((item) => item.length === word.length);
    console.log(currentDictionary.length);
    const randomWord = this.getRandomWord(currentDictionary);
    const currentResult = this.countBull(word, randomWord);
    console.log(randomWord);
    if (currentResult === word.length) return randomWord;

    const newDictionary = currentDictionary.filter((item) => this.countBull(word, item) > currentResult && item !== randomWord);
    this.computerGuessingWord(word, newDictionary);
  }
}
const alex = new GameController();
alex.countBullandCows('акколада', 'акваланг'); // ?
alex.computerGuessingWord('акваланг', dictionary); // ?
module.exports = new GameController();

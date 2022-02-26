const { dictionary } = require('../dictionary');

class GameController {
  dict = dictionary;

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

  getRandomWord(length, dict = this.dict) {
    const validDict = dict.filter((item) => item.length === length);
    const randomIndex = Math.floor(Math.random() * validDict.length);
    return validDict[randomIndex];
  }

  computerGuessingWord(word, dict = this.dict) {
    if (!dict.includes(word)) return null;

    const currentDictionary = this.dict.filter((item) => item.length === word.length);
    const randomWord = this.getRandomWord(word.length, currentDictionary);
    const currentResult = this.countBullandCows(randomWord, word);

    this.dict = currentDictionary.filter((item) => this.countBull(word, item) > currentResult.bulls && item !== randomWord);
    return currentResult;
  }
}
const alex = new GameController();
alex.countBullandCows('акколада', 'акваланг'); // ?
alex.computerGuessingWord('акваланг', dictionary); // ?
export default new GameController();

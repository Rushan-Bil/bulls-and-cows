import axios from 'axios';
import dictionary from '../dictionary';
import dictionaryDef from '../dictionaryWithDefinition';

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
    if (!this.checkSameLength(guessWord, hiddenWord)) return 'У слов разная длина';
    const prepareGuess = this.transformWordToArr(guessWord);
    const prepareHidden = this.transformWordToArr(hiddenWord);
    const result = {
      bulls: 0,
      cows: 0,
    };
    for (let i = 0; i < prepareGuess.length; i++) {
      const current = prepareGuess[i];
      const index = prepareHidden.findIndex((item) => item.letter === current.letter && !item.checked);
      if (index === -1) {
        console.log('МИМО', current);
        continue;
      }

      if (index === current.position) {
        console.log('ЭТО БЫК', current, prepareHidden[index].letter);
        result.bulls += 1;
      } else if (current[index].letter === prepareHidden[index].letter) {
        console.log('БЫК ВПЕРЕДИ', current, prepareHidden[index]);
        continue;
      } else {
        console.log('ЭТО КОРОВА', current, prepareHidden[index]);
        result.cows += 1;
      }
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
export default new GameController();

// async function check() {
//   const res = await axios('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20220224T124541Z.98f309cc535b59ea.d9f0a5365d104d1b3b409d6d4e856815119b7a8f&lang=ru-ru&text=хутор');
//   console.log(res.data);
// }
// check();

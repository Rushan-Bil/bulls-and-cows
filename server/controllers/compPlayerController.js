class CompPlayerController {
  constructor({
    secret, language, hardMode,
  }) {
    this.secret = secret.toLowerCase();
    this.language = language;
    this.hardMode = hardMode;
    this.words = [];
    this.word = '';
  }

  setRandomWord(dict) {
    this.word = this.getRandomWord(dict).toLowerCase();
  }

  static countBull(guessWord, hiddenWord) {
    return guessWord.split('').filter((item, index) => hiddenWord[index] === item).length;
  }

  static getRandomWord(dict) {
    const randomIndex = Math.floor(Math.random() * dict.length);
    return dict[randomIndex].value;
  }

  getRandomWord(dict) {
    const randomIndex = Math.floor(Math.random() * dict.length);
    return dict[randomIndex].value;
  }

  static async guessingWord(dict, compController) {
    const { secret, hardMode, words } = compController;
    const currentDictionary = dict.filter((item) => item.value.length === secret.length);
    if (words.length === 0) {
      const randomWord = this.getRandomWord(currentDictionary);
      const currentResult = this.countBull(randomWord, secret);
      words.push({ bulls: currentResult, word: randomWord });
      return compController;
    }
    console.log(words);
    const filteredDictionary = words.reduce((acc, cur) => acc.filter((item) => {
      if (item.value === cur.word) return;
      const bulls = this.countBull(item.value, secret);
      return hardMode
        ? bulls > cur.bulls
        : bulls >= cur.bulls;
    }), currentDictionary);
    console.log(filteredDictionary.length);
    const randomWord = this.getRandomWord(filteredDictionary);
    const currentResult = this.countBull(randomWord, secret);
    words.push({ bulls: currentResult, word: randomWord });
    return compController;
  }
}

module.exports = CompPlayerController;

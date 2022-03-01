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

  countBull(guessWord, hiddenWord) {
    return guessWord.split('').filter((item, index) => hiddenWord[index] === item).length;
  }

  getRandomWord(dict) {
    const randomIndex = Math.floor(Math.random() * dict.length);
    return dict[randomIndex].value;
  }

  async guessingWord(dict) {
    const currentDictionary = dict.filter((item) => item.value.length === this.secret.length);
    const filteredDictionary = this.words.reduce((acc, cur) => acc.filter((item) => {
      if (item.value !== cur.value) return;
      const bulls = this.countBull(item.value, this.secret);
      return this.hardMode
        ? bulls >= cur.bulls
        : bulls > cur.bulls;
    }, currentDictionary));
    console.log(filteredDictionary.length);
    const randomWord = this.getRandomWord(filteredDictionary);
    const currentResult = this.countBull(randomWord, this.secret);
    this.words.push({ bulls: currentResult, word: randomWord });
    return randomWord;
  }
}

module.exports = CompPlayerController;

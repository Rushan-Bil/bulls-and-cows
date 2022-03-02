class TrainController {
  checkBulls(word1, word2) {
    const wordLength = word1.length;
    let bulls = 0;
    for (let i = 0; i < wordLength; i += 1) {
      if (word1[i].toUpperCase() === word2[i].toUpperCase()) {
        bulls += 1;
        // if (bulls === wordLength) {
        //   alert('Поздравляем! Хорошая игра!');
        // }
      }
    }
    return bulls;
  }

  checkCows(word1, word2) {
    let cows = 0;
    const a = word1.split('');
    a.push(word1[0]);
    a.shift();
    const b = word2.split('');

    for (let i = 0; i < word1.length; i += 1) {
      for (let j = 0; j < b.length; j += 1) {
        if (a[i] === b[j]) {
          a[i] = '#';
          b[j] = '@';
        }
      }
    }

    for (let i = 0; i < b.length; i += 1) {
      if (b[i] === '@') {
        cows += 1;
      }
    }

    return cows - this.checkBulls(word1, word2);
  }
}
export default new TrainController();

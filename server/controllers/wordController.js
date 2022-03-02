const { Word, Language } = require('../db/models');
const CompPlayerController = require('./compPlayerController');
const gameController = require('./GameController');

class WordController {
  async isInDictionary(req, res) {
    const { word, language } = req.body;
    const findLanguage = await Language.findOne({ where: { value: language } });
    if (!findLanguage) {
      return res.status(500).json('Такого языка нет в базе');
    }
    const value = await Word.findOne({ where: { value: word } });

    if (!value) {
      return res.status(500).json('Такого слова нет в базе');
    }
    res.json({ word, language });
  }

  async compGuessWord(req, res) {
    try {
      const { compController, userWord } = req.body;
      const dict = await Word.findAll();
      const newCompController = await CompPlayerController.guessingWord(dict, compController);
      const lastWord = newCompController.words[newCompController.words.length - 1].word;
      const result = gameController.countBullandCows(lastWord, compController.secret);
      const userResult = gameController.countBullandCows(userWord, compController.word);
      const userWin = userResult.bulls === compController.word.length;
      const compWin = result.bulls === compController.secret.length;
      const finishGame = userWin || compWin;
      const gameResult = userWin && compWin
        ? 'tie'
        : userWin
          ? 'userWin'
          : compWin
            ? 'compWin'
            : null;
      return res.json({
        compController: newCompController,
        result,
        userResult,
        gameResult,
        finishGame,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async createCompPlayer(req, res) {
    try {
      const { language, hardMode, secret } = req.body;
      const dict = await Word.findAll();
      const newComp = new CompPlayerController({ secret, hardMode, language });
      console.log(newComp);
      newComp.setRandomWord(dict.filter((item) => item.value.length === secret.length));
      res.json(newComp);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = new WordController();

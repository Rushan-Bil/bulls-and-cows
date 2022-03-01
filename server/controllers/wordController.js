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
      const { compController } = req.body;
      const dict = await Word.findAll();
      const word = compController.guessingWord(dict);
      const result = gameController.countBullandCows(word, compController.secret);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async createCompPlayer(req, res) {
    try {
      const { language, hardMode, secret } = req.body;
      console.log(language, hardMode, secret);
      const dict = await Word.findAll();
      console.log(dict.length);
      const newComp = new CompPlayerController({ secret, hardMode, language });
      console.log(newComp);
      newComp.setRandomWord(dict);
      res.json({ comp: newComp });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = new WordController();

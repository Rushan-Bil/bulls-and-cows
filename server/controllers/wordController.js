const { Word, Language } = require('../db/models');

class wordController {
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
}

module.exports = new wordController();

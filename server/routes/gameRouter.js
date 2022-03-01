const express = require('express');
const wordController = require('../controllers/wordController');
const { Word } = require('../db/models');

const router = express.Router();

router.post('/word', wordController.isInDictionary);
router.post('/guess', wordController.compGuessWord);
router.post('/comp', wordController.createCompPlayer);

router.post('/getword', async (req, res) => {
  try {
    const dictionary = await Word.findAll({ raw: true });
    const curDictionary = dictionary.filter((item) => item.value.length === req.body.wordLength);
    const index = Math.floor(Math.random() * curDictionary.length) + 1;
    res.status(200).json({ word: curDictionary[index].value });
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;

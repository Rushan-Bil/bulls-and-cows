const express = require('express');
const wordController = require('../controllers/wordController');

const router = express.Router();

router.post('/word', wordController.isInDictionary);

module.exports = router;

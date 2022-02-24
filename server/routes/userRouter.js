const express = require('express');

const router = express.Router();

router.post('/registration');
router.post('/login');
router.post('/logout');
router.post('/activate/:link');
router.post('/refresh');

module.exports = router;

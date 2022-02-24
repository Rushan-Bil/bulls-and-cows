const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/activate/:link', UserController.activate);
router.post('/refresh', UserController.refresh);

module.exports = router;

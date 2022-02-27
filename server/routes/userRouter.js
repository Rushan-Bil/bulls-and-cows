const express = require('express');
const { body } = require('express-validator');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth-middleware');
const loginMiddleware = require('../middlewares/login-middleware');
const upload = require('../middlewares/multer-middleware');

const router = express.Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 13 }),
  UserController.registration,
);
router.post('/login', loginMiddleware, UserController.login);
router.post('/logout', UserController.logout);
router.post('/upload/:id', upload.single('file'), UserController.upload);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);

module.exports = router;

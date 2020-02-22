/* eslint-disable function-paren-newline */
const express = require('express');

const router = express.Router();

const artistController = require('../controllers/userController');

router.post(
  '/login',
  artistController.loginUser,
  artistController.setCookie,
  (req, res) => {
    return res.status(200).json({ id: res.locals.userId });
  },
);

router.post(
  '/signup',
  artistController.createUser,
  artistController.setCookie,
  (req, res) => {
    return res.status(200).json({ id: res.locals.userId });
  },
);
module.exports = router;

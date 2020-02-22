/* eslint-disable function-paren-newline */
const express = require("express");

const router = express.Router();

const artistController = require("../controllers/artistController");

router.post(
  "/login",
  artistController.loginUser,
  artistController.setCookie,
  (req, res) => {
    return res.sendStatus(200);
  }
);

router.post(
  "/signup",
  artistController.createUser,
  artistController.setCookie,
  (req, res) => {
    return res.sendStatus(200);
  }
);

router.post("/newCampaign", artistController.createCampaign, (req, res) => {
  return res.sendStatus(200);
});

module.exports = router;

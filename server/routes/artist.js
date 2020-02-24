/* eslint-disable function-paren-newline */
const express = require('express');

const router = express.Router();

const artistController = require('../controllers/artistController');

router.post(
  '/login',
  artistController.loginUser,
  artistController.setCookie,
  (req, res) => {
    return res.status(200).json({ id: res.locals.userId });
  }
);

router.post(
  '/signup',
  artistController.createUser,
  artistController.setCookie,
  (req, res) => {
    return res.status(200).json({ id: res.locals.userId });
  }
);

router.get('/dashboard/:id', artistController.getDashboard, (req, res) => {
  return res.status(200).json({ campaigns: res.locals.campaignData });
});

router.post('/createcampaign', artistController.createCampaign, (req, res) => {
  return res.status(200).json('Successful Campaign Creation');
});

router.post('/editcampaign', artistController.editCampaign, (req, res) => {
  return res.status(200).json(res.locals.campaignData);
});

router.post('/updateCampaign', artistController.updateCampaign, (req, res) => {
  return res.status(200).json(res.locals.campaignData);
});

module.exports = router;

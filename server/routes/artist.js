/* eslint-disable function-paren-newline */
const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

// api for artist to send login
router.post('/login', artistController.loginUser, artistController.setCookie, (req, res) => {
  return res.status(200).json({ id: res.locals.userId });
});

// api for artist to signup
router.post('/signup', artistController.createUser, artistController.setCookie, (req, res) => {
  return res.status(200).json({ id: res.locals.userId });
});

// api to access the artist's personal dashboard after sign-in
router.get('/dashboard', artistController.getDashboard, (req, res) => {
  return res.status(200).json({ campaigns: res.locals.campaignData });
});

// api for artist to send data to db in order to create a campaign
router.post('/createcampaign', artistController.createCampaign, (req, res) => {
  return res.status(200).json('Successful Campaign Creation');
});

// api that sends data to the artist so they can see their current information
router.post('/editcampaign', artistController.editCampaign, (req, res) => {
  return res.status(200).json(res.locals.campaignData);
});

// api for artist to update their campaign information in the db
router.post('/updateCampaign', artistController.updateCampaign, (req, res) => {
  return res.status(200).json('Successful Campaign Update');
});

router.patch('/deactivatecampaign', artistController.deactivateCampaign, (req, res) => {
  return res.status(200).json('Campaign successfully deactivated');
});

module.exports = router;

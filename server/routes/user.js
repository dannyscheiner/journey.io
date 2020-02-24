const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// get campaigns to create routes in App.jsx
router.get('/getCampaigns', userController.getCampaigns, (req, res) => {
  res.status(200).json({ campaigns: res.locals.campaigns });
});

// submit location data for user interest
router.post('/campaign', userController.submitInterest, (req, res) => {
  res.status(200).json('success adding interest');
});

// collect location and campaign data upon load of /user/campaign/:campaignId
router.get(
  '/campaign/:id',
  userController.retrieveCampaignLocationData,
  (req, res) => {
    res.status(200).json(res.locals.campaign);
  }
);

module.exports = router;

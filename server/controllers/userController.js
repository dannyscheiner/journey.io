const db = require('../models/dataModels');

const userController = {};

// Querying for every active campaign and the artist associated with it, so that we can get all our endpoints
const getCampaignsQuery =
  'SELECT artist.name AS artist, artist.id AS artist_id, campaign.name AS campaign, campaign.id AS campaign_id FROM campaign LEFT OUTER JOIN artist ON artist.id = campaign.artist_id WHERE campaign.active=true;';

const submitInterestQuery =
  'INSERT INTO datapoint (location, campaign_id, lat, lng) VALUES ($1, $2, $3, $4)';

const retrieveCampaignLocationDataQuery =
  'SELECT c.*, d.* FROM campaign c INNER JOIN datapoint d ON c.id = d.campaign_id WHERE c.id = $1';

userController.getCampaigns = (req, res, next) => {
  db.query(getCampaignsQuery)
    .then((data) => {
      res.locals.campaigns = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error occured in userController.getCampaigns',
        status: 400,
        message: { err: err }
      });
    });
};

// submit new entry to datapoint table with user location data
userController.submitInterest = (req, res, next) => {
  const data = [req.body.location, req.body.campaignId, req.body.lat, req.body.lng];

  db.query(submitInterestQuery, data)
    .then((result) => {
      console.log('Campaign interest submitted successfully');
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next({
        log: 'Error occured in userController.submitInterest',
        status: 400,
        message: { error: err.detail }
      });
    });
};

userController.retrieveCampaignLocationData = (req, res, next) => {
  const data = [req.params.id];

  db.query(retrieveCampaignLocationDataQuery, data)
    .then((result) => {
      console.log('Campaign data collected successfully');
      const locationData = result.rows.map((data) => ({
        lat: data.lat,
        lng: data.lng
      }));
      res.locals.campaign = {};
      res.locals.campaign.locationData = locationData;
      res.locals.campaign.data = result.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error occured in userController.collectInterest',
        status: 400,
        message: { error: err.detail }
      });
    });
};

module.exports = userController;

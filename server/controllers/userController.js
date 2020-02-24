const db = require('../models/dataModels');

const userController = {};

const getCampaignsQuery =
  'SELECT artist.name AS artist, artist.id AS artist_id, campaign.name AS campaign, campaign.id AS campaign_id FROM campaign LEFT OUTER JOIN artist ON artist.id = campaign.artist_id WHERE campaign.active=true;';

const submitInterestQuery =
  'INSERT INTO datapoint (location, campaign_id, lat, lng) VALUES ($1, $2, $3, $4)';

const collectInterestQuery = 'SELECT * FROM datapoint WHERE campaign_id = $1';

userController.getCampaigns = (req, res, next) => {
  db.query(getCampaignsQuery)
    .then(data => {
      res.locals.campaigns = data.rows;
      return next();
    })
    .catch(err => {
      return next({
        log: 'Error occured in userController.getCampaigns',
        status: 400,
        message: { err: err }
      });
    });
};

// submit new entry to datapoint table with user location data
userController.submitInterest = (req, res, next) => {
  console.log(req.body);
  const data = [
    req.body.location,
    req.body.campaignId,
    req.body.lat,
    req.body.lng
  ];
  console.log(data);
  db.query(submitInterestQuery, data)
    .then(result => {
      console.log('Campaign interest submitted successfully');
      return next();
    })
    .catch(err => {
      console.log(err);
      return next({
        log: 'Error occured in userController.submitInterest',
        status: 400,
        message: { error: err.detail }
      });
    });
};

userController.collectInterest = (req, res, next) => {
  const data = req.params.campaignId;

  db.query(collectInterestQuery, data)
    .then(result => {
      console.log('Campaign data collected successfully');
      return next();
    })
    .catch(err => {
      return next({
        log: 'Error occured in userController.collectInterest',
        status: 400,
        message: { error: err.detail }
      });
    });
};

module.exports = userController;

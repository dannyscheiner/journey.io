const db = require('../models/dataModels');

const userController = {};

const getCampaignsQuery =
  'SELECT artist.name AS artist, artist.id AS artist_id, campaign.name AS campaign, campaign.id AS campaign_id FROM campaign LEFT OUTER JOIN artist ON artist.id = campaign.artist_id WHERE campaign.active=true;';

userController.getCampaigns = (req, res, next) => {
  db.query(getCampaignsQuery)
    .then(data => {
      res.locals.campaigns = data.rows;
      return next();
    })
    .catch(err => {
      return next({
        log: 'Error occured in getCampaigns',
        status: 400,
        message: { err: err },
      });
    });
};

module.exports = userController;

const db = require('../models/dataModels');

const userController = {};

// Querying for every active campaign and the artist associated with it, so that we can get all our endpoints
const getCampaignsQuery =
  'SELECT artist.name AS artist, artist.id AS artist_id, campaign.name AS campaign, campaign.id AS campaign_id FROM campaign LEFT OUTER JOIN artist ON artist.id = campaign.artist_id WHERE campaign.active=true;';

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

module.exports = userController;

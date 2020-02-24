const db = require('../models/dataModels');
const moment = require('moment-timezone');

const artistController = {};

//////////// QUERIES ///////////////
const signupQuery =
  'INSERT INTO artist (name, username, password, location, join_date) VALUES ($1, $2, $3, $4, $5) RETURNING id';
const loginQuery = 'SELECT password, id FROM artist WHERE username=$1';
const updateCookie = 'UPDATE artist SET cookie=$1 WHERE id=$2';
const verifyCookie = 'SELECT cookie FROM artist WHERE id=$1';
const createCampaignQuery =
  'INSERT INTO campaign (artist_id, name, video, facebook, twitter, instagram, youtube, soundcloud, tiktok, spotify, bio ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
const retrieveCampaign =
  'SELECT * FROM campaign WHERE id = $1 AND active = true';
const updateCampaign =
  'UPDATE campaign SET name = $2, video = $3, facebook = $4, twitter = $5, instagram = $6, youtube = $7, soundcloud = $8, tiktok = $9, spotify = $10, bio = $11) WHERE id = $1 AND active = true';
const getDashboardQuery =
  'SELECT name, active FROM campaign WHERE artist_id=$1';
// used for query data populating

const today = moment(new Date())
  .tz('America/Los_Angeles')
  .format()
  .slice(0, 10);

/////////// CONTROLLERS //////////////////
artistController.createUser = (req, res, next) => {
  db.query(signupQuery, [
    req.body.name,
    req.body.username,
    req.body.password,
    req.body.location,
    today,
  ])
    .then(data => {
      res.locals.userId = data.rows[0].id;
      return next();
    })
    .catch(err => {
      return next({
        log: 'Error occured in artistController.createUser',
        status: 400,
        message: { err: err },
      });
    });
};

artistController.loginUser = (req, res, next) => {
  db.query(loginQuery, [req.body.username])
    .then(dbPw => {
      if (dbPw.rows[0].password === req.body.password) {
        res.locals.userId = dbPw.rows[0].id;
        return next();
      } else {
        res.status(400).send('Invalid username/password');
      }
    })
    .catch(err => {
      return next({
        log: 'Error occured in userController.loginUser',
        status: 400,
        message: { err: err },
      });
    });
};

artistController.setCookie = (req, res, next) => {
  const random = Math.floor(Math.random() * 999).toString();
  res.cookie('artistI', res.locals.userId, { httpOnly: true });
  res.cookie('cookie', random, { httpOnly: true });
  db.query(updateCookie, [random, res.locals.userId])
    .then(res => {
      return next();
    })
    .catch(err => {
      return next({
        log: 'Error occured in artistController.setCookie',
        status: 400,
        message: { err: err },
      });
    });
};

artistController.verifyCookie = (req, res, next) => {
  if (!req.cookies.toDoI || !req.cookies.cookie) {
    res.locals.verify = false;
    return next();
  }
  db.query(verifyCookie, [req.cookies.toDoI]).then(verif => {
    if (verif.rows[0].cookie == req.cookies.cookie) {
      res.locals.verify = true;
      return next();
    } else {
      res.locals.verify = false;
      return next();
    }
  });
};

artistController.createCampaign = (req, res, next) => {
  const params = [
    req.body.artist_id, // passed in from state
    req.body.name,
    true, // campaign defaults to active
    req.body.video,
    req.body.facebook,
    req.body.twitter,
    req.body.instagram,
    req.body.youtube,
    req.body.soundcloud,
    req.body.tiktok,
    req.body.spotify,
    req.body.bio,
  ];

  db.query(createCampaignQuery, params)
    .then(result => {
      console.log('Campaign created successfully');
      return next();
    })
    .catch(error => {
      return next({
        log: 'Error occured in userController.createCampaign',
        status: 400,
        message: { error: error.detail },
      });
    });
};

// query db to retrieve current campaign data in order to populate input fields
artistController.editCampaign = (req, res, next) => {
  // receive artist_id from state login session
  const id = [req.body.artist_id];

  // query campaign db for campaign data, return data to server thru locals.campaignData
  db.query(retrieveCampaign, id)
    .then(result => {
      res.locals.campaignData = result.rows[0];
      return next();
    })
    .catch(error => {
      return next({
        log: 'Error occured in userController.createCampaign',
        status: 400,
        message: { error: error.detail },
      });
    });
};

artistController.updateCampaign = (req, res, next) => {
  //  FROM QUERY: name = $2, video = $3, facebook = $4, twitter = $5,
  //instagram = $6, youtube = $7, soundcloud = $8, tiktok = $9, spotify = $10,
  // bio = $11) WHERE artist_id = $1 AND active = true";
  const params = [
    req.body.id, // campaign_id passed in from fetch post, passed down thru state
    req.body.name,
    req.body.video,
    req.body.facebook,
    req.body.twitter,
    req.body.instagram,
    req.body.youtube,
    req.body.soundcloud,
    req.body.tiktok,
    req.body.spotify,
    req.body.bio,
  ];

  db.query(updateCampaign, params)
    .then(result => next()) // result from query isn't needed when updating
    .catch(e => {
      return next({
        log: 'Error occured in userController.createCampaign',
        status: 400,
        message: { error: error.detail },
      });
    });
};

artistController.getDashboard = (req, res, next) => {
  db.query(getDashboardQuery, [req.params.id])
    .then(data => {
      res.locals.campaignData = data.rows;
      return next();
    })
    .catch(err => {
      return next({
        log: 'Error occured in artistController.getDashboard',
        status: 400,
        message: { err: err },
      });
    });
};

// submit updated inputs from edit campaign to update campaign db

module.exports = artistController;

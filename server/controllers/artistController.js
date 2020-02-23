const db = require('../models/dataModels.js');
const moment = require('moment-timezone');

const artistController = {};

//SQL Query Strings
const signupQuery =
  'INSERT INTO artist (name, username, password, location, join_date) VALUES ($1, $2, $3, $4, $5) RETURNING id';
const loginQuery = 'SELECT password, id FROM artist WHERE username=$1';
const updateCookie = 'UPDATE artist SET cookie=$1 WHERE id=$2';
const verifyCookie = 'SELECT cookie FROM artist WHERE id=$1';
const createCampaignQuery =
  'INSERT INTO campaign (artist_id, name, active, video, facebook, twitter, instagram, youtube, soundcloud, tiktok, spotify, bio ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
const getDashboardQuery =
  'SELECT name, active FROM campaign WHERE artist_id=$1';

const today = moment(new Date())
  .tz('America/Los_Angeles')
  .format()
  .slice(0, 10);

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
        log: 'Error occured in userController.createUser',
        status: 400,
        message: { err: err.detail },
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

// (artist_id, name, active, video, facebook, twitter, instagram, youtube, soundcloud, tiktok, spotify, bio )

artistController.createCampaign = (req, res, next) => {
  const params = [
    req.body.artist_id,
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

module.exports = artistController;

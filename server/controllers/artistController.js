const moment = require('moment-timezone');
const db = require('../models/dataModels.js');

const artistController = {};
const signupQuery =
  'INSERT INTO artist (name, username, password, location, join_date) VALUES ($1, $2, $3, $4, $5)';
const loginQuery = 'SELECT password, id FROM artist WHERE username=$1';
const updateCookie = 'UPDATE artist SET cookie=$1 WHERE id=$2';
const verifyCookie = 'SELECT cookie FROM artist WHERE id=$1';
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
    .then(res => {
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
  res.cookie('toDoI', res.locals.userId, { httpOnly: true });
  res.cookie('cookie', random, { httpOnly: true });
  db.query(updateCookie, [random, res.locals.userId]).then(res => {
    return next();
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

module.exports = artistController;

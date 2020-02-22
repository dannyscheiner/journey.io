const db = require('../models/dataModels');

const userController = {};
const signupQuery = 'INSERT INTO artist (username, password) VALUES ($1, $2)';
const loginQuery = 'SELECT password, id FROM artist WHERE username=$1';
const updateCookie = 'UPDATE artist SET cookie=$1 WHERE _id=$2';
const verifyCookie = 'SELECT cookie FROM artist WHERE _id=$1';

userController.createUser = (req, res, next) => {
  db.query(signupQuery, [req.body.username, req.body.pw])
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

userController.loginUser = (req, res, next) => {
  db.query(loginQuery, [req.body.username])
    .then(dbPw => {
      if (dbPw.rows[0].pw === req.body.pw) {
        res.locals.userId = dbPw.rows[0]._id;
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

userController.setCookie = (req, res, next) => {
  const random = Math.floor(Math.random() * 999).toString();
  res.cookie('toDoI', res.locals.userId, { httpOnly: true });
  res.cookie('cookie', random, { httpOnly: true });
  db.query(updateCookie, [random, res.locals.userId]).then(res => {
    return next();
  });
};

userController.verifyCookie = (req, res, next) => {
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

module.exports = userController;

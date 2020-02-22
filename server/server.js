const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

/**
 * handle parsing request body
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router: artist
//routes
// app.use('/artist', artistRouter);

//middleware for grabbing and sending location to database
app.post('/:artist', )

// respond with main app
app.get('/', (req, res) => {
  console.log('fuck everyone fuck everyone fucksdkfsjdkfjdslkfjsadlkfjasdklfjasdoklfojasdfijosdiofjdsiofjsdiofjsdiofjdsiofjdsiofjcsiodfjiodsfjiodsfjdsiofjdsiojfdsiojfoisdjfs')
    res.status(200).sendFile(path.join(__dirname, '../index.html'))
  
}) 

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
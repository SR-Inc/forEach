const express = require('express');
const { get } = require('http');
const path = require('path');
const PORT = 3000;
const app = express();

// parsing request body in JSON format
app.use(express.json());
// parsing request body in urlencoded format
app.use(express.urlencoded({ extended: true }));

app.use('/build', express.static(path.resolve(__dirname , '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});



/**
 * route handlers
 */
const donationRouter = require('./routes/donationRoutes');
const userRouter = require('./routes/userRoutes');
const locationRouter = require('./routes/locationRoutes');

app.use('/location', locationRouter);
app.use('/donation', donationRouter);
app.use('/user', userRouter);

app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`); });

module.exports = app;
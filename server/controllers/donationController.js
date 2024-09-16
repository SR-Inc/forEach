/**
 * 
 * donationController object holds the methods to make sql queries re: donations
 * 
 */

const db = require("../models/databaseModel");
const bcrypt = require('bcrypt');
const donationController = {};

donationController.getDonations = (req, res, next) => {
  const allDonations = 'SELECT sum(amount) FROM donations';
  db.query(allDonations)
    .then((data) => {
      res.locals.donations = data.rows[0].sum;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in getDonations middleware',
        status: 500,
        message: {err},
      });
    }); 
};

// check that all 3 values are inputted as well as correct types
donationController.reqBodyChecker = (req, res, next) => {
  const { amount, user_id, credit_card } = req.body
  if (typeof amount !== 'number') {
    return next({
      log: 'Error: amount must be a number value',
      status: 500,
      message: {err: 'Error: amount must be a number value'},
    })
  }
  if (typeof user_id !== 'number') {
    return next({
      log: 'Error: user_id must be a number value',
      status: 500,
      message: {err: 'Error: user_id must be a number value'},
    })
  }
  // we ONLY want strings of numbers
  // we DONT want nonstrings or nonnumber(inner)
  if (typeof credit_card !== 'string' || isNaN(credit_card) === true) {
    return next({
      log: 'Error: credit_card must be a string of numbers',
      status: 500,
      message: {err: 'Error: credit_card must be a string of numbers'},
    })
  }
  return next();
};

donationController.makeDonation = async (req, res, next) => {
  const { amount, user_id, credit_card } = req.body

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dateString = `${year}-${month}-${day}`;

  let hashedCreditCard = await bcrypt.hash(credit_card, 10);

  const addDonation = `INSERT INTO donations (amount, user_id, credit_card, date) VALUES(${amount}, ${user_id}, '${hashedCreditCard}', '${dateString}') RETURNING *`
  db.query(addDonation)
    .then((data) => {
      res.locals.insertedRow = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in makeDonation middleware',
        status: 500,
        message: {err},
      });
    })
};
module.exports = donationController;

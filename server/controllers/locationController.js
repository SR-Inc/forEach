/**
 * 
 * locationController object holds the methods to make sql queries re: locations
 * 
 */

const db = require("../models/databaseModel");

const locationController = {};

locationController.getlocations = (req, res, next) => {
  const queryString = 'SELECT * FROM locations';
  db.query(queryString)
    .then((data) => {
      res.locals.locations = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in getlocations middleware',
        status: 500,
        message: {err},
      });
    }); 
};

module.exports = locationController;
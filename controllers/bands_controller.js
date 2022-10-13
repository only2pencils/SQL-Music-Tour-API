// DEPENDENCIES
const bands = require("express").Router();
const db = require("../models");
const { Band } = db;

//INDEX ROUTE
// FIND ALL BANDS
bands.get("/", async (req, res) => {
  try {
    const foundBands = await Band.findAll();
    res.status(200).json(foundBands);
  } catch (error) {
    res.status(500).json(error);
  }
});

//SHOW ROUTE
// FIND A SPECIFIC BAND
bands.get("/:id", async (req, res) => {
  try {
    const foundBand = await Band.findOne({
      where: { band_id: req.params.id },
    });
    res.status(200).json(foundBand);
  } catch (error) {
    res.status(500).json(error);
  }
});

// EXPORT
module.exports = bands;

//INDEX ROUTE
// 1. create a GET route that goes to '/'.
// 2. set up a try/catch statement.
// 3. call the findAll() helper method on our Band model and save it to a variable 'foundBands'.
// 4. send back the foundBands as a JSON response with a status of 200.
// 5. in the catch, send back a JSON response with the error and a status of 500.

//SHOW ROUTE

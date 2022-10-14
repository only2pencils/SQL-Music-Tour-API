// DEPENDENCIES
const bands = require("express").Router();
const db = require("../models");
const { Band } = db;
const { Op } = require("sequelize");

//INDEX ROUTE
// FIND ALL BANDS
bands.get("/", async (req, res) => {
  try {
    const foundBands = await Band.findAll({
      order: [["available_start_time", "ASC"]],
      where: {
        // name: { [Op.like]: `%${req.query.name}%` },
        name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` },
      },
    });
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

//CREATE ROUTE
bands.post("/", async (req, res) => {
  try {
    const newBand = await Band.create(req.body);
    res.status(200).json({
      message: "Successfully inserted a new band",
      data: newBand,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE ROUTE
bands.put("/:id", async (req, res) => {
  try {
    const updatedBands = await Band.update(req.body, {
      where: {
        band_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully updated ${updatedBands} band(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE ROUTE
bands.delete("/:id", async (req, res) => {
  try {
    const deleteBands = await Band.destroy({
      where: {
        band_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedBands} band(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// EXPORT
module.exports = bands;

///* NOTES *///

//INDEX ROUTE
// 1. create a GET route that goes to '/'.
// 2. set up a try/catch statement.
// 3. call the findAll() helper method on our Band model and save it to a variable 'foundBands'.
// 4. send back the foundBands as a JSON response with a status of 200.
// 5. in the catch, send back a JSON response with the error and a status of 500.

//SHOW ROUTE

//CREATE ROUTE

//UPDATE ROUTE

//DELETE ROUTE

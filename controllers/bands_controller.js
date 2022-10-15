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
bands.get("/:name", async (req, res) => {
  try {
    const foundBand = await Band.findOne({
      where: { band_id: req.params.name },
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
// 1. create another GET route but have it go to '/:id'.
// 2. inside the callback, set up a try/catch statement
// 3. inside the try, call the findOne({}) helper method on our Band model and save it to a variable
//    called 'foundBand'.
// 4. we want a specific band returned so we need to pass the findOne method an object. This object
//    specifies that we want to find a band where its band_id is equal to the req.params.id.
// 5. Send back the foundBand as a JSON response with a status of 200.
// 6. In the catch, send back a JSON response with the error and a status of 500.

//CREATE ROUTE
// 1. Create a POST route going to '/'.
// 2. Inside the callback, set up a try/catch statement.
// 3. Inside the try, call the create helper method on our Band model and save it to a variable called
//    newBand.
// 4. You may recall that this method accepts an object as its argument that specifies which columns
//    and values to create.  We can assume anyone using this route will send back a request body with
//    that information.  Therefore we can pass in the req.body as the argument.
// 5. The create method returns the data used to create the entry.  We saved it to a variable called
//    newBand, so we can use that in our response.  Send back a JSON response with that data and a
//    status of 200.
// 6. In the catch, send back a JSON response with the error and a status of 500.

//UPDATE ROUTE
// 1. Create a PUT route that goes to '/:id'.
// 2. In the callback, set up a try/catch statement.
// 3. In the try, call the update method on our Band model and save it to a variable called updatedBands.
//    Recall that this method requires two arguments.  The first should be an object to update the entry.
//    The second should be an object that specifies which entry to update.
// 4. As with our POST route, we can asssume anyone using this route will send a request body object
//    containing the needed column and values. Further, we can assume they used the correct ID for the
//    entry in the URI parameter. Use those values to construct the update method.
// 5. Underneath that, send back a JSON response with a message that says the update is successful
//    and include a status of 200.

//DELETE ROUTE
// 1. Create a DELETE route that goes to '/:id'.
// 2. In the callback, set up a try/catch statement.
// 3. In the try, call the destroy method on our Band model and save it to a variable called deletedBands.
//    You may recall that this method accepts one argument (an object that specifies the entries to delete).
// 4. In our case, we're deleting by ID, provided in the req.params. Use that information to specify
//    which entry to delete.
// 5. Underneath that, send JSON response with a message that says the deletion was successful and
//    include a status of 200.
//     *Similar to update, destroy returns the number of entries deleted. Again, this is not
//      particularly useful on its own, so we'll send a custom success message instead.
// 6. In the catch, send back a JSON response with the error and a status of 500.

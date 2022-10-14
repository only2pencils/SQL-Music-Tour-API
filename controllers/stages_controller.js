// DEPENDENCIES
const stages = require("express").Router();
const db = require("../stages");
const { Band } = db;
const { Op } = require("sequelize");

// INDEX ROUTE //
// FIND ALL STAGES
stages.get("/", async (req, res) => {
  try {
    const foundStages = await stages.findAll({
      order: [["available_start_time"]],
      where: {
        name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` },
      },
    });
    res.status(200).json(foundStages);
  } catch (error) {
    res.status(500).json(error);
  }
});
// SHOW ROUTE //
// FIND A SPECIFIC STAGE
stages.get("/:id", async (req, res) => {
  try {
    const foundBand = await stages.findOne({
      where: { stage_id: req.params.id },
    });
    res.status(200).json(foundBand);
  } catch (error) {
    res.status(500).json(error);
  }
});
// CREATE ROUTE //
stages.post("/", async (req, res) => {
  try {
    const newStage = await stage.create(req.body);
    res.status(200).json({
      message: "New stage successfully inserted",
      data: newStage,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// UPDATE ROUTE //
stages.put("/:id", async (req, res) => {
  try {
    const updatedStages = await stage.update(req.body, {
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Updated successfully ${updatedStages} stage(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// DELETE ROUTE //
stages.delete("/:id", async (req, res) => {
  try {
    const deleteStages = await Stage.destroy({
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Delete successful ${deletedStages} stage(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// EXPORT //
module.exports = stages;

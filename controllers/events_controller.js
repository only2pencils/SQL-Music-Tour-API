// DEPENDECIES
const { Op } = require("sequelize");

// INDEX ROUTE //
// FIND ALL EVENTS
events.get("/", async (req, res) => {
  try {
    const foundEvents = await Event.findAll({
      order: [["available_dates", "ASC"]],
      where: {
        name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` },
      },
    });
    res.status(200).json(foundEvents);
  } catch (error) {
    res.status(500).json(error);
  }
});
// SHOW ROUTE //
// FIND A SPECIFIC EVENT
events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id },
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})
// CREATE ROUTE //
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: "Ya, you created a new event!"
            data: newEvent,
        })
    } catch (err) {
        res.status(500).json(err)
    }
})
// UPDATE ROUTE //
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id,
            }
        })
        res.status(200).json({
            message: `Update complete ${updatedEvents} event(s)`,
        })
    } catch (err) {
        res.status(500).json(err)
    }
})
// DELETE ROUTE //
events.delete('/:id', async (req, res) => {
    try {
        const deleteEvents = await Event.destroy({
            where: {
                event_id: req.params.id,
            }
        })
        res.status(200).json({
            message: `Delete complete ${deletedEvents} event(s)`,
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = events


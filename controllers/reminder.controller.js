const Reminder = require("../models").Reminder;
const { verifyToken } = require("./user.controller");

async function insert(req, res) {
  try {
    const authorization = req.headers.authorization;
    const token = authorization ? authorization.split(" ")[1] : "";
    const userId = verifyToken(token);
    if (userId == 0) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const newReminder = {
      appointmentId: req.body.apmId,
      duration: req.body.duration,
      userId: userId,
    };

    const createdReminder = await Reminder.create(newReminder);
    res.status(201).json({
      message: "Reminder created",
      data: createdReminder,
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Reminder.",
    });
  }
}

async function remove(req, res) {
  const id = req.params.id;
  try {
    const authorization = req.headers.authorization;
    const token = authorization ? authorization.split(" ")[1] : "";
    const userId = verifyToken(token);
    if (userId == 0) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const num = await Reminder.destroy({ where: { id: id, userId: userId } });
    if (num == 1) {
      res.status(200).json({
        message: "Reminder deleted",
      });
    } else {
      res.status(404).json({
        message: `Reminder with id ${id} not found`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        `Some error occurred while deleting Reminder with id ${id}`,
    });
  }
}

module.exports = {
  insert,
  remove,
};

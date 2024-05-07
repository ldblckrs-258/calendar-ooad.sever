const Apm = require("../models").Apm;
const { verifyToken } = require("./user.controller");
const { Op, fn, ne, notIn } = require("sequelize");
const { joinedList, reminderOf } = require("./util.controller");

async function getConflict(userId, newApm) {
  const joined = await joinedList(userId);
  console.log(joined);
  const existingApm = await Apm.findOne({
    where: {
      [Op.and]: [
        { [Op.or]: [{ ownerId: userId }, { id: { [Op.in]: joined } }] },
        { date: [fn("DATE", newApm.date)] },
        {
          [Op.or]: [
            {
              startTime: {
                [Op.between]: [newApm.startTime, newApm.endTime],
              },
            },
            {
              endTime: {
                [Op.between]: [newApm.startTime, newApm.endTime],
              },
            },
            {
              [Op.and]: [
                {
                  startTime: {
                    [Op.lte]: newApm.startTime,
                  },
                },
                {
                  endTime: {
                    [Op.gte]: newApm.endTime,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  });
  return existingApm;
}

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

    const newApm = {
      ownerId: userId,
      title: req.body.title,
      location: req.body.location,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      isGroup: req.body.isGroup,
    };

    const existingApm = await getConflict(userId, newApm);

    if (existingApm) {
      res.status(409).json({
        message: "Time conflict with existing appointment",
        data: existingApm,
      });
    } else {
      const data = await Apm.create(newApm);
      res.status(200).json({
        message: "Appointment created",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Appointment.",
    });
  }
}

async function getConflictById(userId, apmId) {
  const newApm = await Apm.findOne({ where: { id: apmId } });
  if (!newApm) return null;
  return getConflict(userId, newApm);
}

function isOutdated(date, time) {
  const [hour, minute] = time.split(":");
  const thisDate = new Date(date);
  thisDate.setHours(hour, minute);
  return thisDate.toISOString() < new Date().toISOString();
}

async function getAll(req, res) {
  try {
    const authorization = req.headers.authorization;
    const token = authorization ? authorization.split(" ")[1] : "";
    const userId = verifyToken(token);
    const month = req.body.month;
    const year = req.body.year;

    if (userId == 0) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    const joinList = await joinedList(userId);

    const data = await Apm.findAll({
      where: {
        [Op.and]: [
          { [Op.or]: [{ ownerId: userId }, { id: { [Op.in]: joinList } }] },
          {
            date: {
              [Op.between]: [
                new Date(year, month - 1, 1, 7),
                new Date(year, month, 0, 7),
              ],
            },
          },
        ],
      },
      order: [
        ["date", "ASC"],
        ["startTime", "ASC"],
      ],
    });

    const additionData = await Promise.all(
      data.map(async (apm) => {
        const reminderData = await reminderOf(apm.id, userId);
        return {
          ...apm.toJSON(),
          reminder: reminderData,
          isOutdated: isOutdated(apm.date, apm.startTime),
          own: apm.ownerId === userId,
        };
      })
    );

    res.status(200).json({
      message: "All Appointments",
      data: additionData,
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving appointments.",
    });
    console.log(err);
  }
}

async function remove(req, res) {
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

    const id = req.params.id;
    const data = await Apm.destroy({ where: { id: id, ownerId: userId } });

    if (data == 1) {
      res.status(200).json({
        message: "Appointment deleted",
      });
    } else {
      res.status(404).json({
        message: `Appointment with id=${id} not found`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while deleting the Appointment.",
    });
  }
}

async function update(req, res) {
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

    const id = req.params.id;

    const data = await Apm.update(req.body, {
      where: { id: id, ownerId: userId },
    });

    if (data == 1) {
      res.status(200).json({
        message: "Appointment updated",
      });
    } else {
      res.status(404).json({
        message: `Appointment with id=${id} not found`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while updating the Appointment.",
    });
  }
}

async function verifyOwner(userId, apmId) {
  const data = await Apm.findOne({ where: { id: apmId } });
  return data.ownerId === userId;
}

async function getGM(req, res) {
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
    const joined = await joinedList(userId);
    console.log(joined);
    const data = await Apm.findAll({
      where: {
        isGroup: true,
        ownerId: { [Op.ne]: userId },
        id: { [Op.notIn]: joined },
      },
      order: [
        ["date", "ASC"],
        ["startTime", "ASC"],
      ],
    });

    const additionData = await Promise.all(
      data.map(async (apm) => {
        const reminderData = await reminderOf(apm.id, userId);
        return {
          ...apm.toJSON(),
          reminder: reminderData,
          isOutdated: isOutdated(apm.date, apm.startTime),
        };
      })
    );

    res.status(200).json({
      message: "All Group Meeting",
      data: additionData,
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving appointments.",
    });
  }
}

async function checkGMMatch(req, res) {
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

    const apmTitle = req.body.title;
    const apmStartTime = req.body.startTime;
    const apmEndTime = req.body.endTime;

    const duration =
      (new Date(`1970-01-01T${apmEndTime}`) -
        new Date(`1970-01-01T${apmStartTime}`)) /
      60000;

    const data = await Apm.findAll({
      where: {
        isGroup: true,
        title: apmTitle,
      },
    });

    const matched = data.find((apm) => {
      const apmDuration =
        (new Date(`1970-01-01T${apm.endTime}`) -
          new Date(`1970-01-01T${apm.startTime}`)) /
        60000;
      return apmDuration === duration;
    });

    if (matched) {
      res.status(200).json({
        message: "Matched Group Meeting",
        data: matched,
      });
    } else {
      res.status(404).json({
        message: "No matched Group Meeting",
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving appointments.",
    });
  }
}

module.exports = {
  insert,
  getAll,
  remove,
  update,
  verifyOwner,
  getGM,
  checkGMMatch,
  getConflictById,
};

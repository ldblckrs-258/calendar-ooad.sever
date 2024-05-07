const GMP = require("../models").GMP;
const { verifyToken } = require("./user.controller");
const { getConflictById } = require("./apm.controller");

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

    const existingApm = await getConflictById(userId, req.params.apmId);
    if (existingApm) {
      res.status(409).json({
        message: "Conflict with existing appointment.",
        data: existingApm,
      });
      return;
    }

    const newGMP = {
      userId: userId,
      apmId: req.params.apmId,
    };

    const data = await GMP.create(newGMP);
    res.status(201).json({
      message: "User joined the group meeting.",
      data: data,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the GMP.",
    });
  }
}

async function getJoined(req, res) {
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

    const data = await GMP.findAll({ where: { userId: userId } });

    const joined = data.map((GMP) => {
      return GMP.apmId;
    });

    res.status(200).json({
      message: "All group meeting joined by user",
      data: joined,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving GMPs.",
    });
  }
}

async function getOut(req, res) {
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

    const data = await GMP.destroy({
      where: { userId: userId, apmId: req.params.apmId },
    });

    if (data == 1) {
      res.status(200).json({
        message: "User left the group meeting.",
      });
    } else {
      res.status(404).json({
        message: `User with id=${userId} not found in group meeting with id=${req.params.apmId}`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while deleting the GMP.",
    });
  }
}

module.exports = {
  insert,
  getJoined,
  getOut,
};

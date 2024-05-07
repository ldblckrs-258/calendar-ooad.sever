const User = require("../models").User;
const jwt = require("jsonwebtoken");

async function insert(req, res) {
  const user = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const data = await User.findOne({ where: { email: user.email } });
    if (data) {
      res.status(400).json({
        message: "Email already exists",
      });
      return;
    }

    const createdUser = await User.create(user);
    res.status(201).json({
      message: "User created",
      data: createdUser,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
}

async function getAll(req, res) {
  try {
    const data = await User.findAll();
    res.status(200).json({
      message: "All Users",
      data: data,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving users.",
    });
  }
}

const secretKey = "ldblckrs";

function generateToken(email, password, id) {
  const payload = {
    email: email,
    password: password,
    id: id,
  };
  const token = jwt.sign(payload, secretKey);
  return token;
}

function verifyToken(token) {
  let result = 0;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      result = 0;
    } else {
      result = decoded.id;
    }
  });
  return result;
}

async function authenticate(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  const verify = verifyToken(token);
  if (!verify) {
    return res.status(401).send({
      message: "Unauthorized!",
    });
  } else {
    try {
      const data = await User.findByPk(verify);
      res.status(200).send({
        message: "Authorized",
        data: {
          id: data.id,
          fullName: data.fullName,
          email: data.email,
        },
        token: token,
      });
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user data.",
      });
    }
  }
}

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const data = await User.findOne({ where: { email: email } });
    if (data.password === password) {
      const token = generateToken(data.email, data.password, data.id);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        message: "User authenticated",
        token: token,
      });
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while authenticating user.",
    });
  }
}

function logout(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logged out",
  });
}

async function remove(req, res) {
  const id = req.params.id;
  try {
    const num = await User.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "User was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Could not delete User with id=" + id,
    });
  }
}

module.exports = {
  insert,
  getAll,
  login,
  logout,
  remove,
  authenticate,
  verifyToken,
};

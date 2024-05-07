const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // replace with the origin of your client app
    credentials: true,
  })
);

app.use("/users", require("./routes/users"));
app.use("/apm", require("./routes/apm"));
app.use("/reminder", require("./routes/reminder"));
app.use("/gmp", require("./routes/gmp"));

module.exports = app;

const router = require("express").Router();
const { insert, getJoined, getOut } = require("../controllers/gmp.controller");

router.get("/", (req, res) => {
  res.json({ message: "Group meeting participants Route" });
});
router.post("/create/:apmId", insert);
router.get("/joined", getJoined);
router.get("/out/:apmId", getOut);

module.exports = router;

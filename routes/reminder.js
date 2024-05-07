const router = require("express").Router();
const { insert, remove } = require("../controllers/reminder.controller");

router.get("/", (req, res) => {
  res.json({ message: "Reminder Route" });
});
router.post("/insert", insert);
router.get("/remove/:id", remove);

module.exports = router;

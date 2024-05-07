const router = require("express").Router();
const {
  insert,
  getAll,
  remove,
  update,
  getGM,
  checkGMMatch,
} = require("../controllers/apm.controller");

router.get("/", (req, res) => {
  res.json({ message: "Appointment Route" });
});

router.post("/create", insert);
router.post("/all", getAll);
router.get("/remove/:id", remove);
router.put("/update/:id", update);
router.get("/gm", getGM);
router.post("/check", checkGMMatch);

module.exports = router;

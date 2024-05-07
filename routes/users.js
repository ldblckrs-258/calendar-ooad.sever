const router = require("express").Router();
const {
  insert,
  getAll,
  login,
  logout,
  remove,
  authenticate,
} = require("../controllers/user.controller");

router.get("/", (req, res) => {
  res.json({ message: "User Route" });
});

router.post("/create", insert);
router.get("/all", getAll);
router.post("/authenticate", login);
router.get("/logout", logout);
router.get("/remove/:id", remove);
router.use(authenticate);

module.exports = router;

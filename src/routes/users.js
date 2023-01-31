const { allUsers, createUser, loginUser } = require("../controllers/users");

const router = require("express").Router();

router.get("/allUsers", allUsers);
router.post("/login", loginUser);
router.post("/", createUser);

module.exports = router;

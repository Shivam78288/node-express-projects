const express = require("express");
const router = express.Router();
const { login, dashboard } = require("../controllers/main");
const authMiddleware = require("../middleware/auth");

router.post("/login", login);
router.get("/dashboard", authMiddleware, dashboard);

module.exports = router;

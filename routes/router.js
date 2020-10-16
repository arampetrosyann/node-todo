const express = require("express");
const router = express.Router();
const { renderHome } = require("../controllers/router.controller");

router.get("/", renderHome);

module.exports = router;

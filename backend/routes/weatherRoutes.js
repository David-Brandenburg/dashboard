// backend/routes/weatherRoutes.js
const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");

// Z. B.: GET /api/weather?city=Würzburg&units=metric
router.get("/", weatherController.getWeather);

module.exports = router;

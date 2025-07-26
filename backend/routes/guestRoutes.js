// backend/routes/guestRoutes.js
const express = require("express");
const router = express.Router();
const guestCtrl = require("../controllers/guestController");

// Besucher anlegen
router.post("/", guestCtrl.createGuest);

// Alle Besucher abrufen (optional)
router.get("/", guestCtrl.getAllGuests);

module.exports = router;

// backend/controllers/guestController.js
const Guest = require("../models/Guest");

/**
 * POST /api/guests
 * Legt einen neuen Besucher an.
 * Body: { name: string, company: string }
 */
exports.createGuest = async (req, res) => {
  const { name, company } = req.body;
  if (!name || !company) {
    return res.status(400).json({ message: "Name und Company erforderlich" });
  }

  try {
    const guest = await Guest.create({ name, company });
    res.status(201).json(guest);
  } catch (err) {
    console.error("Error creating guest:", err);
    res
      .status(500)
      .json({ message: "Serverfehler beim Anlegen des Besuchers" });
  }
};

/**
 * GET /api/guests
 * Liefert alle angelegten Besucher.
 */
exports.getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find().sort("-createdAt");
    res.json(guests);
  } catch (err) {
    console.error("Error fetching guests:", err);
    res.status(500).json({ message: "Serverfehler beim Abrufen der Besucher" });
  }
};

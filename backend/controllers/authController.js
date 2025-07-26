// backend/controllers/authController.js
const User = require("../models/User");

exports.windowsLogin = async (req, res) => {
  // express-ntlm legt hier den Windows‑User ab:
  const winUser = req.ntlm?.UserName;
  if (!winUser) {
    return res.status(401).json({ message: "Keine Windows‑Anmeldung erkannt" });
  }

  try {
    // In der DB nachschlagen, ob dieser User berechtigt ist
    const user = await User.findOne({ username: winUser });
    if (!user) {
      return res
        .status(403)
        .json({ message: "Windows‑User nicht autorisiert" });
    }

    // Alles gut: Username + Rollen zurückgeben
    return res.json({
      username: user.username,
      roles: user.roles,
    });
  } catch (err) {
    console.error("authController.windowsLogin Fehler:", err);
    return res.status(500).json({ message: "Serverfehler" });
  }
};

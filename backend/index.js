require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ntlm = require("express-ntlm");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth/windows", ntlm()); // NTLM‑Handshake für Windows‑Auth
app.use("/api/auth", require("./routes/authRoutes"));

// MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Deine bisherigen Routen
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/devices", require("./routes/deviceRoutes"));

// Neue Wetter‑Route
app.use("/api/weather", require("./routes/weatherRoutes"));

app.listen(5000, () => console.log("Server läuft auf Port 5000"));

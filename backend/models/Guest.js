// backend/models/Guest.js
const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt automatisch
  }
);

module.exports = mongoose.model("Guest", GuestSchema);

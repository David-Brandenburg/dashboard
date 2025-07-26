const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // z.B. "MEINDOMÄNE\\Hans.Mustermann" oder ".\\David"
    },
    roles: {
      type: [String],
      default: ["user"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);

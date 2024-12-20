const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  moments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Moment" }], // Array of Moments
});

const User = mongoose.model("User", userSchema);
module.exports = User;

const mongoose = require("mongoose");

const momentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to User
  opinion: String,
});

const Moment = mongoose.model("Moment", momentSchema);
module.exports = Moment;

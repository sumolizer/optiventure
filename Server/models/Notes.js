const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  userId: { type: String },
  noteId: {
    type: String,
  },
  timestamp: { type: Date, default: Date.now },

  noteText: { type: String, required: true },
});

module.exports = mongoose.model("Note", noteSchema);

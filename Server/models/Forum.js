const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: { type: String },
  commentId: {
    type: String,
  },
  timestamp: { type: Date, default: Date.now },
  commentText: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Comment", commentSchema);

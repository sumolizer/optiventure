const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Note = require("./models/Notes");
const Comment = require("./models/Forum");
const cors = require("cors");
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://eurofan3148:LZom31qSQiyA8iyJ@cluster0.pxiuz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/optiventure",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.post("/api/notes", async (req, res) => {
  const { userId, noteText } = req.body;
  try {
    const newNote = new Note({ userId, noteText });
    await newNote.save();
    res.status(201).json({ success: true, note: newNote });
  } catch (err) {
    console.error("Error during note creation:", err);
    res.status(400).json({ success: false, error: err.message });
  }
});

app.get("/api/notes", async (req, res) => {
  const { userId } = req.query; // Get userId from query params

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // Filter notes by userId
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notes", error: error.message });
  }
});
const getNotes = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const notes = await Note.find({ userId }); // Ensure filtering by userId
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
};

app.patch("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { noteText } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { noteText },
      { new: true }
    );
    res.status(200).json({ success: true, note: updatedNote });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});
app.put("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { noteText } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { noteText },
      { new: true }
    );
    res.status(200).json({ success: true, note: updatedNote });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Note.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post("/api/forum", async (req, res) => {
  const { userId, username, commentText } = req.body;
  try {
    const newComment = new Comment({ userId, username, commentText });
    console.log(newComment);
    await newComment.save();
    res.status(201).json({ success: true, comment: newComment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.get("/api/forum", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/forum/:id/vote", async (req, res) => {
  const { id } = req.params;
  const { voteType } = req.body; // "upvote" or "downvote"
  try {
    const increment = voteType === "upvote" ? 1 : -1;
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { $inc: { votes: increment } },
      { new: true }
    );
    res.status(200).json({ success: true, comment: updatedComment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.delete("/api/forum/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});
app.delete("/api/delete-user-data/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    await Note.deleteMany({ userId });
    await Comment.deleteMany({ userId });

    res
      .status(200)
      .json({ success: true, message: "User data deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(7777, () => {
  console.log("Server is running on port 5175...");
});

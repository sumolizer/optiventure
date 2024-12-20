const mongoose = require("mongoose");
const Comment = require("./models/Forum"); // Adjust path as needed
const Note = require("./models/Notes");

mongoose
  .connect("mongodb://127.0.0.1:27017/optiventure", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Seed Data
const seedData = async () => {
  await Comment.insertMany([
    {
      userId: "64cdd4af7c2d3b001c97f5aa",
      commentId: "fc001",
      timestamp: new Date(),
      commentText: "This is an excellent idea for a business in this area!",
      votes: 15,
    },
    {
      userId: "64cdd4af7c2d3b001c97f5ab",
      commentId: "fc002",
      timestamp: new Date(),
      commentText:
        "I think we should also consider market saturation before investing.",
      votes: 5,
    },
    {
      userId: "64cdd4af7c2d3b001c97f5ac",
      commentId: "fc003",
      timestamp: new Date(),
      commentText:
        "Does anyone have data on customer demographics in this region?",
      votes: 8,
    },
  ]);

  await Note.insertMany([
    {
      userId: "64cdd4af7c2d3b001c97f5aa",
      noteId: "n001",
      timestamp: new Date(),
      noteText: "Analyze customer trends for the upcoming business proposal.",
    },
    {
      userId: "64cdd4af7c2d3b001c97f5ab",
      noteId: "n002",
      timestamp: new Date(),
      noteText: "Research competitors in the selected area before presenting.",
    },
  ]);

  console.log("Seeding completed!");
  mongoose.connection.close();
};

seedData();

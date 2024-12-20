const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/momentstest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  category: String,
  moments: [{ type: Schema.Types.ObjectId, ref: "Moment" }],
});

const momentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  opinion: String,
  category: { type: Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Moment = mongoose.model("Moment", momentSchema);

const addcomment = async (comment) => {
  // Find the user with the specified category
  const user = await User.findOne({ category: "Football" });

  if (user) {
    // Create a new moment associated with the found user
    const newcom = new Moment({
      author: user._id, // Set the author to the user's _id
      opinion: comment, // Use the comment passed into the function
      category: user._id, // Assuming category relates to the user
    });

    // Save the new moment to the database
    const savedMoment = await newcom.save();
    // Update the user's document to include the new moment
    user.moments.push(savedMoment._id);
    await user.save();
    console.log("Comment added successfully!");
  } else {
    console.log("User not found.");
  }
};
// Moment.find()
//   .populate("category", "category")
//   .populate("author", "name")
//   .then((Moment) => console.log(Moment));
User.find()
  .populate("moments", "opinion")
  .then((user) => console.log(user));

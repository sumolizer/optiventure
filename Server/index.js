const express = require("express");
const app = express();
const path = require("path");
const engine = require("ejs-mate");
const methodOverride = require("method-override");

const mongoose = require("mongoose");
const Moment = require("./models/moment");
const userm = require("./models/user");
mongoose
  .connect("mongodb://127.0.0.1:27017/moments", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.listen(6969, () => {
  console.log("Listening ...");
});

// Middleware to log every request
app.use("/pee", (req, res, next) => {
  console.log("Middleware is working");
  next();
});
app.get("/euro/index", async (req, res) => {
  const moments = await Moment.find().populate("user", "name");
  res.render("allcomments.ejs", { moments });
});
app.get("/euro/new", (req, res) => {
  res.render("newmoment.ejs");
});
app.get("/euro/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const moment = await Moment.findById(id);
    res.render("edit.ejs", { moment });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
app.get("/euro/:id/edit", async (req, res) => {
  const { id } = req.params;
  const moment = await Moment.findById(id);
  res.render("patch.ejs", { moment });
});
app.get("/euro/profile/:user", async (req, res) => {
  const { user } = req.params;
  const suse = await userm.findOne({ name: user }).populate("moments");
  res.render("userprofile.ejs", { suse });
});
app.post("/euro/index", async (req, res) => {
  const { username, opinion } = req.body;
  const user = await userm.findOne({ name: username }).populate("moments");

  if (user) {
    const newMoment = new Moment({ user: user._id, opinion });
    await newMoment.save();

    user.moments.push(newMoment);
    await user.save();
  }

  res.redirect("/euro/index");
});

app.patch("/euro/:id", async (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.opinion;
  const moment = await moment.findByIdAndUpdate(id, {
    opinion: newCommentText,
  });
  res.redirect("/euro/index");
});
app.delete("/euro/:id", async (req, res) => {
  const { id } = req.params;
  await Moment.findByIdAndDelete(id);
  res.redirect("/euro/index");
});
app.get("/", (req, res) => {
  res.redirect("/euro/index");
});
app.get("*", (req, res) => {
  res.redirect("/euro/index");
});

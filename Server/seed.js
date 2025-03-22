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
      userId: "user_1",
      username: "Ahmed Traders",
      commentId: "cmt_101",
      commentText:
        "Before investing in a business, we must analyze how much competition already exists in the market.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_2",
      username: "Hassan Textiles",
      commentId: "cmt_102",
      commentText:
        "Customer footfall trends should be evaluated before setting up a retail shop.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_3",
      username: "Rana Enterprises",
      commentId: "cmt_103",
      commentText:
        "The demand for restaurants in Islamabad is already high, so a unique selling point is crucial.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_4",
      username: "Bilal Electronics",
      commentId: "cmt_104",
      commentText:
        "Online businesses seem more scalable than traditional brick-and-mortar stores these days.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_5",
      username: "Usman Garments",
      commentId: "cmt_105",
      commentText:
        "The best way to succeed in a saturated market is by offering something innovative and unique.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_6",
      username: "Ali & Sons",
      commentId: "cmt_106",
      commentText:
        "Foot traffic analysis in commercial zones can help determine a business’s potential success.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_7",
      username: "Zubair Tech",
      commentId: "cmt_107",
      commentText:
        "Tech startups have a better survival rate compared to traditional businesses in Islamabad.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_8",
      username: "Karachi Biryani",
      commentId: "cmt_108",
      commentText:
        "Food businesses can be profitable, but market competition is extremely high.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_9",
      username: "Junaid Supermart",
      commentId: "cmt_109",
      commentText:
        "The location of a business is often more important than the business itself.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_10",
      username: "Hafiz Auto Parts",
      commentId: "cmt_110",
      commentText:
        "Auto parts businesses thrive where public transport dependency is high.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_11",
      username: "Tariq Stationery",
      commentId: "cmt_111",
      commentText:
        "Educational institutions influence the demand for stationery and printing services.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_12",
      username: "Naeem Herbal",
      commentId: "cmt_112",
      commentText:
        "Health-conscious consumers have increased the demand for herbal and organic products.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_13",
      username: "Al-Noor Developers",
      commentId: "cmt_113",
      commentText:
        "Real estate projects need extensive market research before investment.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_14",
      username: "Shakeel Dairy",
      commentId: "cmt_114",
      commentText:
        "Milk and dairy businesses are highly profitable but require consistent quality control.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_15",
      username: "Green Valley Foods",
      commentId: "cmt_115",
      commentText:
        "The organic food industry is growing fast but needs reliable suppliers.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_16",
      username: "Pak IT Solutions",
      commentId: "cmt_116",
      commentText:
        "Software houses in Pakistan are booming due to international demand.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_17",
      username: "Saad Pharma",
      commentId: "cmt_117",
      commentText:
        "Medicine and pharmacy businesses always have demand but require strict regulations.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_18",
      username: "Sultan Bakers",
      commentId: "cmt_118",
      commentText:
        "Bakery businesses perform well in residential areas with high foot traffic.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_19",
      username: "Murtaza Fashion",
      commentId: "cmt_119",
      commentText:
        "Fast fashion is highly competitive, so unique branding is important.",
      votes: Math.floor(Math.random() * 100),
    },
    {
      userId: "user_20",
      username: "Punjab Logistics",
      commentId: "cmt_120",
      commentText:
        "Logistics businesses succeed where e-commerce demand is high.",
      votes: Math.floor(Math.random() * 100),
    },
  ]);
  console.log("Seeding completed!");
  mongoose.connection.close();
};

seedData();

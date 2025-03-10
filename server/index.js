require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const connectDb = require("./config/connectDB");

app.use(express.json());

app.use("/welcome", (req, res) => {
  return res.send("Hello from express");
});

//admin-routes
app.use("/admin/auth", require("./routes/admin/authRoutes"));

connectDb()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    })
  )
  .catch((error) => {
    console.log("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  });

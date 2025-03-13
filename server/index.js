require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const cookieParser=require("cookie-parser")
const connectDb = require("./config/connectDB");

app.use(express.json());
app.use(cookieParser());

app.use("/welcome", (req, res) => {
  return res.send("Hello from express");
});

//admin-routes
app.use("/admin/auth", require("./routes/admin/authRoutes"));
app.use("/admin/supplier", require("./routes/admin/supplier/adminSupplierRoutes"));
app.use("/admin/employee", require("./routes/admin/employee/adminEmployeeRoutes"));
app.use("/admin/item", require("./routes/admin/item/adminItemRoutes"));

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

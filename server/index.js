require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const cookieParser=require("cookie-parser")
const connectDb = require("./config/connectDB");
const cors=require("cors")
const corsOptions = require("./config/corsOptions");
const path = require("path");

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use("/welcome", (req, res) => {
  return res.send("Hello from express");
});

//admin-routes
app.use("/admin/auth", require("./routes/admin/authRoutes"));
app.use("/admin/supplier", require("./routes/admin/supplier/adminSupplierRoutes"));
app.use("/admin/employee", require("./routes/admin/employee/adminEmployeeRoutes"));
app.use("/admin/item", require("./routes/admin/item/adminItemRoutes"));
app.use("/admin/purchase", require("./routes/admin/purchase/purchaseRoutes"));
app.use("/admin/customer",require("./routes/admin/customer/adminCustomerRoutes"));
app.use("/admin/sales",require("./routes/admin/sales/salesRoutes"));
app.use("/admin/company",require("./routes/admin/company/adminCompanyRoutes"));
app.use("/admin/payment",require("./routes/admin/payment/paymentRoutes"))
app.use("/admin/file",require("./routes/admin/fileUploadRoutes"))

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

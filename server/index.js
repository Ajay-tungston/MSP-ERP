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
  res.sendFile(path.join(__dirname, "views", "welcome.html"));
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
app.use("/admin/cashbook",require("./routes/admin/cashbook/cashbookRouter"))
app.use("/admin/expense",require("./routes/admin/expense/expenseRoutes"))
app.use("/admin/lender",require("./routes/admin/lender/adminLenderRoutes"))
app.use("/admin/trialBalance",require("./routes/admin/trialBalnce/trialBalanceRoute"))
app.use("/admin/vehicle", require("./routes/admin/vehicle/vehicleRoutes"))

app.use("/admin/transaction",require("./routes/admin/transaction/transactionRoutes"))

app.use("*", (req, res) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404-Page not found" });
  } else {
    res.type("txt").send("404-Page not found");
  }
});

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

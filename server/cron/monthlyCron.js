require("dotenv").config();
const cron = require("node-cron");
const connectDb = require("../config/connectDB");
const generateMonthlyClosure = require("../utils/generateMonthlyClosure");

(async () => {
  await connectDb(); 

  console.log("🕒 Cron service started...");

  // Every day at 23:59
  cron.schedule("59 23 * * *", async () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    if (tomorrow.getDate() === 1) {
      console.log("📅 Month end detected. Running monthly closure...");
      try {
        await generateMonthlyClosure();
        console.log("✅ Monthly closure complete");
      } catch (error) {
        console.error("❌ Monthly closure failed:", error.message);
      }
    } else {
      console.log("⏭️ Not month-end. Skipping...");
    }
  });
})();

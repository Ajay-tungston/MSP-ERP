const Admin = require("../../models/Admin");
const Otp = require("../../models/Otp");
const jwt=require("jsonwebtoken");
const { generateUniqueOtp } = require("../../utils/otpHelper");

const sendOtpForPasswordReset=async(req,res)=>{
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });
        const checkAdminPresent = await Admin.findOne({ email });
        if (!checkAdminPresent) {
          return res.status(404).json({ message: "Admin not found" });
        }
    
        const otp = await generateUniqueOtp();
        await Otp.create({ otp, email });
        
        res.status(200).json({ message: "OTP sent successfully"  });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
}

const verifyOtpForPasswordReset = async (req, res) => {
    try {
      const { otp, email } = req.body;
      if (!otp || !email)
        return res.status(400).json({ message: "OTP and email are required" });
      const checkAdminPresent = await Admin.findOne({ email });
      if (!checkAdminPresent) {
        return res.status(404).json({ message: "admin not found" });
      }
      const checkOtp = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
      if (checkOtp.length === 0 || checkOtp[0].otp !== otp) {
        return res.status(422).json({ message: "Invalid OTP" });
      }
  
      const resetToken = jwt.sign({ email }, process.env.RESET_TOKEN_SECRET, { expiresIn: "5m" });
  
      res.cookie("resetToken", resetToken, {
        httpOnly: true, 
        secure: false, 
        sameSite: "lax", 
        maxAge: 5 * 60 * 1000, 
      });
  
      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  module.exports = { sendOtpForPasswordReset,verifyOtpForPasswordReset };
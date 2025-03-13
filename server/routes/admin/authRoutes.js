const express=require("express")
const { login, signUp, checkResetToken, resetPassword } = require("../../controllers/admin/authController")
const { sendOtpForPasswordReset, verifyOtpForPasswordReset } = require("../../controllers/otp/otpController")
const router=express.Router()

router.post("/login",login)
router.post("/signup",signUp)


router.post("/forgot-password",sendOtpForPasswordReset)
router.post("/verify-otp",verifyOtpForPasswordReset)
router.get("/check-reset-token",checkResetToken)
router.post("/reset-password",resetPassword)

module.exports=router
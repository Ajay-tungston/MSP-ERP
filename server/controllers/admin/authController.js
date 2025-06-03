const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,32}$/;

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    if (!usernameRegex.test(username)) {
      return res
        .status(400)
        .json({
          message:
            "Username must be between 3 and 20 characters, and only contain letters, numbers, or underscores",
        });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character, and be no more than 32 characters long"
      });
    }

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      username,
      email,
      password: hashedPassword,
    });
    await admin.save();

    const accessToken = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.ACCESSTOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.REFRESHTOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax'
    });
    return res
      .status(201)
      .json({
        message: "User created successfully",
        username: admin.username,
        accessToken,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter both email and password" });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const accessToken = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.ACCESSTOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.REFRESHTOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax'
    });

    return res.status(200).json({
      message: "login successfull",
      username: admin.username,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating user" });
  }
};

const refresh=async(req,res)=>{
    try {
        const cookies = req.cookies;
        if (!cookies || !cookies.jwt) {
          return res
            .status(401)
            .json({ message: "Please login first , unauthorized" });
        }
        const refreshToken = cookies.jwt;
        jwt.verify(
          refreshToken,
          process.env.REFRESHTOKEN_SECRET,
          async (err, decoded) => {
            if (err) {
              return res.status(403).json({ message: "Invalid token" });
            }
            const { id } = decoded;
            const foundUser = await Admin.findById(id);
      
            if (!foundUser) {
              return res.status(404).json({ message: "Admin not found" });
            }
            const accessToken = jwt.sign(
                { id: foundUser._id, email: foundUser.email },
                process.env.ACCESSTOKEN_SECRET,
                { expiresIn: "1h" }
              );
             return res.status(200).json({ message: "refresh token successfull", accessToken });
          }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
}

const logOut = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.json({ message: "cookie cleared and logOut" });
};

//for password reset

const checkResetToken=async(req,res)=>{
  try {
    const resetToken = req.cookies?.resetToken;
    if (!resetToken) return res.status(401).json({ message: "Unauthorized or token expired" });

    // Verify token
    const decoded = jwt.verify(resetToken, process.env.RESET_TOKEN_SECRET);
    if (!decoded.email) return res.status(401).json({ message: "Invalid token" });
    const admin = await Admin.findOne({ email: decoded.email });
    if (!admin) return res.status(401).json({ message: "Invalid token" });

    res.status(200).json({ message: "Token verified" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error verifying token" });
  }
}

const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword)
      return res.status(400).json({ message: "New password is required" });
    const resetToken = req.cookies?.resetToken;
    if (!resetToken)
      return res.status(401).json({ message: "Unauthorized or token expired" });

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character, and be no more than 32 characters long"
      });
    }
    const decoded = jwt.verify(resetToken, process.env.RESET_TOKEN_SECRET);
    const admin = await Admin.findOne({ email: decoded.email });
    if (!admin) return res.status(404).json({ message: "admin not found" });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error during password reset: ", error);
    res.status(500).json({ message: "Error during password reset" });
  }
};

module.exports = { login, signUp,refresh,checkResetToken,resetPassword,logOut };

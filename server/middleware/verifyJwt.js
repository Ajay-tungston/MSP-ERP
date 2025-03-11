const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

//only work for admin

const verifyJwt = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESSTOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded;

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(404).json({ message: "Unauthorized" });
      }
    next();
  });
};

module.exports = verifyJwt;
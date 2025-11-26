const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // use dotenv
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ status: false, message: "Invalid token" });
  }
};

module.exports = authenticateJWT;

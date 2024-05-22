const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token after "Bearer"
  console.log(token);
  if (!token) {
    return res
      .status(403)
      .json({ auth: false, message: "Access denied. No token provided." });
  }

  // Verify the token
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ auth: false, message: "Token expired." });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ auth: false, message: "Invalid token." });
      } else {
        return res
          .status(500)
          .json({ auth: false, message: "Failed to authenticate token." });
      }
    }

    // If verification is successful, attach the decoded user ID to the request object
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;

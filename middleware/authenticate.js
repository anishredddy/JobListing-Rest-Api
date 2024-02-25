const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  jwt.verify(token, process.env.secretKey, (err, decodedPayload) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decodedPayload.user;
    next();
  });
}

module.exports = authenticateToken;

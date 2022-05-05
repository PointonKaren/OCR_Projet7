const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      userRole: user.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};

exports.decodeToken = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  return { userId: decodeToken.userId, userRole: decodedToken.userRole };
};

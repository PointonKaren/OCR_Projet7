const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      userRole: user.role,
    },
    process.env.JWT,
    { expiresIn: "24h" }
  );
};

const jwt = require("jsonwebtoken");
const env = require("../config/env");
const prisma = require("../config/db");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access token required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.JWT_SECRET);

    const user = await prisma.users.findUnique({
      where: { id: decoded.id },
    });

    if (!user || !user.is_active) {
      return res.status(401).json({ error: "User is inactive or not found" });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authenticate;

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({
      status: "error",
      message: "No token provided",
    });
  }
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "error",
      message: "Invalid Token",
    });
  }
};

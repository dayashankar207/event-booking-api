import jwt from "jsonwebtoken";

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.user.role)) {
        return res.status(403).json({ error: "Access denied : Unauthorized" });
      }
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
};
export default auth;

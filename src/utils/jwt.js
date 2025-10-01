import jwt from "jsonwebtoken";

export const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { user: { id: user.id, email: user.email, role: user.role } },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { user: { id: user.id, email: user.email, role: user.role } },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  // Read the token
  const token = req.headers["authorization"];

  // If no token, send error
  if (!token) {
    return res.status(401).send("Access Denied. Unauthorized.");
  }

  // Extract token from "Bearer <token>" format
  const actualToken = token.startsWith("Bearer ") ? token.slice(7) : token;

  // Check if token is valid or not
  try {
    const payload = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.userID = payload.userID;
  } catch (err) {
    // Return Error
    return res.status(401).send("Access Denied. Unauthorized.");
  }

  // Call next middleware
  next();
};

export default jwtAuth;

import UserModel from "../features/user/user.model.js";
const basicAuthorizer = (req, res, next) => {
  // Check for authorization header
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("No authorization details found");
  }
  console.log(authHeader);

  // Extract the credentials
  const base64Credentials = authHeader.replace("Basic", "");
  console.log(base64Credentials);

  // Decode credentials
  const decodedCreds = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  console.log(decodedCreds);
  const creds = decodedCreds.split(":");

  const user = UserModel.getAll().find(
    (u) => u.email === creds[0] && u.password === creds[1]
  );
  if (user) {
    next();
  } else {
    return res.status(401).send("Invalid Credentials");
  }
};

export default basicAuthorizer;

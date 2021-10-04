import { Request, Response, NextFunction } from "express";
// Validate dummy token
function dummyAuth(req: Request, res: Response, next: NextFunction) {
  const providedDummyToken = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  if (providedDummyToken === process.env.DUMMY_TOKEN) {
    next();
  } else {
    return res
      .status(401)
      .json({ message: "Por favor provee un token válido" });
  }
}

export default dummyAuth;

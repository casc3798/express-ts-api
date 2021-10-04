import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// Check if jwt token is valid
function jwtAuthentication(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.headers["access_token"];
  jwt.verify(
    accessToken as string,
    process.env.JWT_SIGN as string,
    (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Error de autenticación", error: err });
      } else {
        type userInfoOnJwt = {
          userInfo: {
            id: number;
            device_id: string;
            email: string;
          };
        };
        const decodedJwt = decoded as userInfoOnJwt;
        req.userInfo = decodedJwt.userInfo;
        next();
      }
    }
  );
}

export { jwtAuthentication };

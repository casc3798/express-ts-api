import { Request, Response } from "express";
import { RefreshToken } from "../../models/refreshToken/index";
import jwt from "jsonwebtoken";
import { header } from "express-validator";
/**
 * Callback triggered by the GET /refresh-token endpoint. Providing a valid refresh token refreshes
 * the access token (JWT), invalidates the passed refresh token and returns a new one
 *
 * @remarks
 * Provided access token can be expired but not invalid
 *
 * @returns Server response (if successfull, contains a new refresh token and access token)
 *
 * @throws Request validation errors {@link validatorRefreshToken | refresh token validator}
 *
 * @throws Authentication errors
 */
async function refreshToken(req: Request, res: Response) {
  const currentRefreshToken: string = req.headers["refresh_token"] as string;
  const currentAccessToken = req.headers["access_token"] as string;

  type userInfoOnJwt = {
    userInfo: { id: number; device_id: string; email: string };
  };
  // Verify refresh token without expiration validation
  jwt.verify(
    currentAccessToken,
    process.env.JWT_SIGN as string,
    { ignoreExpiration: true },
    (err, decoded) => {
      if (err) {
        return res.status(500).json({ message: "Server error", error: err });
      } else {
        const decodedJwt = decoded as userInfoOnJwt;
        const user_id = decodedJwt.userInfo.id;
        const device_id = decodedJwt.userInfo.device_id;
        // Update refresh token if user is logged in
        RefreshToken.updateRefreshTokenRegister({
          user_id,
          device_id,
          refresh_token: currentRefreshToken,
        }).then(async (registers) => {
          // If there is no refresh token register for that user and device,
          // returns invalid session message
          if (registers.length <= 0) {
            return res.status(400).json({
              message: "Session not found",
            });
          } else {
            // Generating a new access token
            // Create payload with user info
            const payload = {
              userInfo: {
                id: decodedJwt.userInfo.id,
                email: decodedJwt.userInfo.email,
                device_id: decodedJwt.userInfo.device_id,
              },
            };
            // Set expiration time for token
            const options = { expiresIn: "15m" };
            // Generate new access token
            const accessToken: string = await jwt.sign(
              payload,
              process.env.JWT_SIGN as string,
              options
            );
            return res.json({
              refresh_token: registers[0].refresh_token,
              access_token: accessToken,
            });
          }
        });
      }
    }
  );
}

/**
 * Request data validation for the refresh token controller
 *
 * @see express-validator documentation: https://express-validator.github.io
 */

function validatorRefreshToken() {
  return [header("access_token").exists(), header("refresh_token").exists()];
}

export { refreshToken, validatorRefreshToken };
export default refreshToken;

import { Request, Response } from "express";
import { RefreshToken } from "../../models/refreshToken/index";

/**
 * Callback triggered by the DELETE /logout endpoint. Deletes the refresh token
 * register in the database.
 *
 * @returns Server response (if successfull, contains only the closed session message)
 *
 * @throws Authentication errors
 */
async function logout(req: Request, res: Response) {
  type partialUserInfo = { id: number; device_id: string };
  // Gets user information from request (check jwtAuth middleware)
  const userInfoFromToken = req.userInfo as partialUserInfo;
  // Delete refresh token from database
  RefreshToken.deleteRefreshTokenRegister({
    user_id: userInfoFromToken.id,
    device_id: userInfoFromToken.device_id,
  })
    .then((registers) => {
      if (registers.length > 0) {
        return res.json({ message: "Successful logout" });
      } else {
        return res.status(400).json({ message: "Session not found" });
      }
    })
    .catch((err) => {
      if (err) {
        return res.status(500).json({ message: "Server error", error: err });
      }
    });
}

export default logout;

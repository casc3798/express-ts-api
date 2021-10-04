import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UIDGenerator from "uid-generator";
import { User } from "../../models/user/index";
import { RefreshToken } from "../../models/refreshToken/index";
import { body } from "express-validator";

/**
 * Callback triggered by the POST /login endpoint. Authenticates an existing user
 * via email and password returning a valid access (jwt) and refresh (uuid) token
 *
 * @remarks
 * Access tokens are not stored in the database, otherwise refresh tokens are stored
 * next to the deviceId via {@link RefreshToken.createRefreshTokenRegister | create RefreshToken}
 *
 * @remarks
 * Access tokens expires in 15 minutes. Refresh tokens that are stored in the database
 * never expire
 *
 * @remarks
 * There is only one valid refresh token per user device
 *
 * @remarks
 * If there is already an existing refresh token in the database related to the
 * user and deviceId, then the refresh token is updated
 *
 * @remarks
 * Password is validated using {@link bcrypt.compare | bcrypt.js compare function}
 *
 * @returns Server response (if successfull, contains a refresh token and an access token)
 *
 * @throws Request validation errors {@link validatorLogin | login validator}
 *
 * @throws Authentication errors
 */
async function login(req: Request, res: Response) {
  const userInfo = req.body;
  // Find user by email
  User.findUser({ email: userInfo.email }, [
    "id",
    "email",
    "firstname",
    "password",
  ])
    .then((user) => {
      // If user is not found then return invalid credentials message
      if (user.length === 0) {
        return res.status(400).json({ message: "Invalid credentials" });
      } else {
        // If user is found then continue with the authentication
        const userFound = user[0];
        // Check if encrypted password match
        bcrypt.compare(
          userInfo.password,
          userFound.password,
          async (err, match) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                message: "Server error",
                error: err,
              });
            }
            // If passwords hashes are not equals then return invalid credentials
            // message
            if (!match) {
              return res.status(400).json({
                message: "Invalid credentials",
              });
            } else {
              // Create payload with user info
              const payload = {
                userInfo: {
                  id: userFound.id,
                  email: userFound.email,
                  device_id: userInfo.device_id,
                  firstname: userFound.firstname,
                },
              };
              // Set expiration time for token
              const options = { expiresIn: "15m" };
              // Generate access token (JWT)
              const accessToken: string = await jwt.sign(
                payload,
                process.env.JWT_SIGN as string,
                options
              );
              // Checks if there is already an existing refresh token for that
              // user and device
              RefreshToken.findRefreshTokenRegister({
                user_id: userFound.id,
                device_id: userInfo.device_id,
              }).then(async (registers) => {
                // If it does, then we generate a new refresh token
                if (registers.length > 0) {
                  // Update refresh token
                  RefreshToken.updateRefreshTokenRegister({
                    id: registers[0].id,
                  })
                    // and return the new access token
                    .then((register) => {
                      return res.json({
                        message: "Successful login",
                        access_token: accessToken,
                        refresh_token: register[0].refresh_token,
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      return res
                        .status(500)
                        .json({ message: "Server error", error: err });
                    });
                } else {
                  // If there is no existing refresh token for that user and device
                  // then we should create a new one
                  const uidgen = new UIDGenerator();
                  const refreshToken: string = await uidgen.generate();
                  // Create object with refresh token info
                  const refreshTokenInfo = {
                    user_id: userFound.id,
                    device_id: userInfo.device_id,
                    refresh_token: refreshToken,
                  };
                  // Generate instance of refresh token
                  const refreshTokenInstance = new RefreshToken(
                    refreshTokenInfo
                  );
                  // Store the new refresh token register in the database
                  // and return the new access_token and refresh_token
                  refreshTokenInstance
                    .createRefreshTokenRegister()
                    .then(() => {
                      return res.json({
                        message: "Successful login",
                        access_token: accessToken,
                        refresh_token: refreshToken,
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      return res
                        .status(500)
                        .json({ message: "Server error", error: err });
                    });
                }
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Server error", error: err });
    });
}

/**
 * Request data validation for the login controller
 *
 * @see express-validator documentation: https://express-validator.github.io
 */
function validatorLogin() {
  return [
    body("email").exists().isEmail().trim(),
    body("password").exists().trim(),
    body("device_id").exists().trim(),
  ];
}

export default login;
export { validatorLogin, login };

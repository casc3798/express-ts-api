import express from "express";
import * as authController from "../controllers/auth/index";
import { jwtAuthentication } from "../middlewares/auth/jwt";
import handleValidations from "../middlewares/validations/handleValidations";
const authRouter = express.Router();

// Set all routes for authentication
authRouter.post(
  "/login",
  authController.validatorLogin(),
  handleValidations,
  authController.login
);
authRouter.get("/refresh-token", authController.refreshToken);
authRouter.delete("/logout", jwtAuthentication, authController.logout);

export default authRouter;

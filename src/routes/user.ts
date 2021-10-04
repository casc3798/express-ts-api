import express from "express";
import * as userController from "../controllers/user/index";
import dummyAuth from "../middlewares/auth/dummyAuth";
import { jwtAuthentication } from "../middlewares/auth/jwt";
import handleValidations from "../middlewares/validations/handleValidations";
const userRouter = express.Router();

// Set all routes for user
userRouter.post(
  "/user",
  dummyAuth,
  userController.validatorCreateUser(),
  handleValidations,
  userController.createUser
);
userRouter.get("/users", jwtAuthentication, userController.listUsers);
userRouter.get(
  "/user/:id",
  jwtAuthentication,
  userController.validatorFindUser(),
  handleValidations,
  userController.findUser
);
userRouter.put(
  "/user/:id",
  jwtAuthentication,
  userController.validatorUpdateUser(),
  handleValidations,
  userController.updateUser
);
userRouter.put(
  "/user/recover/:id",
  jwtAuthentication,
  userController.validatorEditPassword(),
  handleValidations,
  userController.editPassword
);

export default userRouter;

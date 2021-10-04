import { Request, Response } from "express";
import { User } from "../../models/user/index";
import { body } from "express-validator";

/**
 * Callback triggered by the POST /user endpoint. Creates a new user in the database
 *
 * @remarks Uses the {@link User.createUser | User.createUser method}
 *
 * @returns Server response (if successfull, contains the new user data)
 *
 * @throws Request validation errors {@link validatorCreateUser | create user validator}
 *
 * @throws Authentication errors
 */
async function createUser(req: Request, res: Response) {
  // Creating a new User Object
  const user = new User(req.body);

  // Saving the User Object in PostgreSQL
  user
    .createUser()
    .then((result) => {
      return res.status(201).json({ message: "User created", user: result[0] });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Server error", error: err });
    });
}

/**
 * Request data validation for the create user controller
 *
 * @see express-validator documentation: https://express-validator.github.io
 */
function validatorCreateUser() {
  return [
    body("firstname").exists().trim(),
    body("lastname").exists().trim(),
    body("nickname").exists().trim(),
    body("email").exists().isEmail().trim(),
    body("phone").exists().trim(),
    body("country").exists().trim(),
    body("city").exists().trim(),
    body("language").exists().trim(),
    body("time_zone").exists().trim(),
    body("image").optional().trim(),
    body("password").exists().isLength({ min: 8 }),
  ];
}

export default createUser;
export { validatorCreateUser, createUser };

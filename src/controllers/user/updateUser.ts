import { Request, Response } from "express";
import { User } from "../../models/user/index";
import { body, param } from "express-validator";

/**
 * Callback triggered by the PUT /user/:id endpoint. Edits an user by id
 * in the database
 *
 * @remarks Uses the {@link User.updateUser | User.updateUser method}
 *
 * @returns Server response (if successfull, contains the updated data from the user)
 *
 * @throws Request validation errors {@link validatorUpdateUser | update user validator}
 *
 * @throws User not found error
 */
async function updateUser(req: Request, res: Response) {
  const userId = req.params.id;
  const newUserInfo = req.body;
  // Update user info by id
  User.updateUser({ id: userId }, newUserInfo)
    .then((users) => {
      if (users.length <= 0) {
        return res.status(400).json({ message: "User not found" });
      } else {
        return res.json({ message: "User updated", user: users[0] });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Server error", error: err });
    });
}

/**
 * Request data validation for the update user controller
 *
 * @see express-validator documentation: https://express-validator.github.io
 */
function validatorUpdateUser() {
  return [
    param("id").exists().isNumeric().trim(),
    body("firstname").optional().trim(),
    body("lastname").optional().trim(),
    body("nickname").optional().trim(),
    body("email").optional().isEmail().trim(),
    body("phone").optional().trim(),
    body("country").optional().trim(),
    body("city").optional().trim(),
    body("language").optional().trim(),
    body("time_zone").optional().trim(),
    body("image").optional().trim(),
    body("password").optional().isLength({ min: 8 }),
  ];
}

export default updateUser;
export { validatorUpdateUser, updateUser };

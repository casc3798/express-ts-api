import { Request, Response } from "express";
import { User } from "../../models/user/index";
import { body, param } from "express-validator";

/**
 * Callback triggered by the PUT /user/recover/:id endpoint. Edits the
 * password for the user specified by id without validating old password
 *
 * @remarks Uses the {@link User.updateUser | User.updateUser method}
 *
 * @returns Server response (if successfull, contains an updated password message)
 *
 * @throws Request validation errors {@link validatorEditPassword | edit password validator}
 *
 * @throws User not found error
 */
async function editPassword(req: Request, res: Response) {
  const newPassword: string = req.body.password as string;
  const userId: string = req.params.id as string;
  // Update user password by id
  User.updateUser({ id: userId }, { password: newPassword })
    .then((users) => {
      if (users.length <= 0) {
        return res.status(400).json({ message: "User not found" });
      } else {
        return res.json({ message: "Password updated" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Server error", error: err });
    });
}

/**
 * Request data validation for the edit password controller
 *
 * @see express-validator documentation: https://express-validator.github.io
 */
function validatorEditPassword() {
  return [
    param("id").exists().isNumeric().trim(),
    body("password").exists().isLength({ min: 8 }),
  ];
}

export default editPassword;
export { validatorEditPassword, editPassword };

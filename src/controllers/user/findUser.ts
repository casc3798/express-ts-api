import { Request, Response } from "express";
import { User } from "../../models/user/index";
import { param } from "express-validator";

/**
 * Callback triggered by the GET /user/:id endpoint. Returns the information of
 * certain user found by id
 *
 * @remarks returns certain user fields (id, firstName, lastname, email,
 * nickname, email, phone, country, city, language, time_zone, image)
 *
 * @remarks Uses the {@link User.findUser | User.findUser method}
 *
 * @returns Server response (if successfull, contains the user information)
 *
 * @throws Request validation errors {@link validatorFindUser | find user validator}
 *
 * @throws Authentication errors
 *
 * @throws User not found error
 */
async function findUser(req: Request, res: Response) {
  const userId = req.params.id;
  // Find user by id
  User.findUser({ id: userId }, [
    "id",
    "firstname",
    "lastname",
    "nickname",
    "email",
    "phone",
    "country",
    "city",
    "language",
    "time_zone",
    "image",
  ])
    .then((result) => {
      if (result.length <= 0) {
        return res.status(400).json({ message: "User not found" });
      } else {
        return res.json({ user: result[0] });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Server error", error: err });
    });
}

/**
 * Request data validation for the find user controller
 *
 * @see express-validator documentation: https://express-validator.github.io
 */
function validatorFindUser() {
  return [param("id").exists().isNumeric().trim()];
}

export default findUser;
export { validatorFindUser, findUser };

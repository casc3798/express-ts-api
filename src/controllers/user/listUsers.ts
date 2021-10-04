import { Request, Response } from "express";
import { User } from "../../models/user/index";

/**
 * Callback triggered by the GET /users endpoint. Returns a list of the users
 * in the database
 *
 * @remarks returns certain fields for every user (id, firstName, lastname, email,
 * nickname, email, phone, country, city, language, time_zone, image)
 *
 * @remarks Uses the {@link User.findUser | User.findUser method}
 *
 * @returns Server response (if successfull, contains an array with the list of users)
 *
 * @throws Authentication errors
 */
async function listUsers(req: Request, res: Response) {
  // List all users
  User.findUser({}, [
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
      return res.status(200).json({ users: result });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Server error", error: err });
    });
}

export default listUsers;

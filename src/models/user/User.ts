import { knexInstance as knex } from "../../database/connection/database";
import UserInterface from "./UserInterface";
import bcrypt from "bcryptjs";

/**
 * Represents an User in the application
 * @public
 */
export default class User {
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  language: string;
  time_zone: string;
  image: string;
  password: string;

  /**
   * Creates a new User Object
   * @param userInfo - Object with the user information
   * @public
   */
  constructor(userInfo: UserInterface) {
    this.firstname = userInfo.firstname;
    this.lastname = userInfo.lastname;
    this.nickname = userInfo.nickname;
    this.email = userInfo.email;
    this.phone = userInfo.phone;
    this.country = userInfo.country;
    this.city = userInfo.city;
    this.language = userInfo.language;
    this.time_zone = userInfo.time_zone;
    this.image = userInfo.image;
    this.password = userInfo.password;
  }

  /**
   * Creates a new user in database
   *
   * @example
   *
   * // Creates a new user in database
   * // SQL: INSERT INTO user (...every user field...) VALUES (...every value...)
   * const userData = {
   *  firstname: "testUser",
   *  lastname = "lastname",
   *  nickame = "mynick123",
   *  email = "testUser@test.com",
   *  phone = "111111 ext 4",
   *  country = "Colombia",
   *  city = "Bogota",
   *  language = "ES",
   *  time_zone = "GMT-5",
   *  image = "https://myimage.com/image.png",
   *  password = "mysecurepassword"
   * };
   *
   * const user = new User(userData);
   * const newUser = await user.createUser();
   * @remarks
   * Password is hashed using {@link bcrypt.hash | bcrypt.js hash function}
   *
   * @remarks
   * In case of successfull creation, the new user password is not returned
   *
   * @returns Promise with the information of the new user in an object
   *
   * @throws Validation errors, please check the User table migrations to
   * identify possible database constrains
   *
   * @public
   */
  async createUser(): Promise<any> {
    const saltRounds = 15;
    // Encrypt password
    const hashedPassword = await bcrypt.hash(
      this.password as string,
      saltRounds
    );
    this.password = hashedPassword;

    return knex("user").insert(this, [
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
    ]);
  }

  /**
   * Find users in the database
   *
   * @example
   *
   * // Find user with certain email address
   * // SQL: SELECT * FROM user WHERE email="test@test.com":
   * User.findUsers({email: "test@test.com"});
   *
   * @example
   * // Find user with certain email address (returning only their id)
   * // SQL: SELECT id FROM user WHERE email="test@test.com"
   * User.findUsers({email: "test@test.com"}, ["id"]);
   *
   * @remarks
   * This will return every single fields of every user found
   * if no returnFields parameter is provided
   *
   * @param searchInfo - Object with query content
   *
   * @param returnFields - Array with the list of wanted attributes to be returned
   *
   * @returns Promise with the list of found users
   *
   * @public
   */
  static async findUser(
    searchInfo: any,
    returnFields?: string[]
  ): Promise<any> {
    const query = searchInfo;
    return knex("user")
      .where(query)
      .select(returnFields as any);
  }

  /**
   * Updates an user in the database
   *
   * @example
   *
   * // Updating user with certain email address
   * // SQL: UPDATE user SET firstname="newName"  WHERE email="test@test.com"
   * User.updateUser({email: "test@test.com"}, {firstname: "newName"});
   *
   * @remarks
   * This will return every single fields for the new user
   *
   * @remarks
   * The search condition should return only one user (for example,
   * searching by id or email, in general only unique fields)
   *
   * @param searchInfo - Object with query content (this must be a unique field)
   *
   * @param newData - Object with the user's data to update
   *
   * @returns Promise with a single-item array that contains the new user
   * information as an object
   *
   * @public
   */
  static async updateUser(searchInfo: any, newData: any): Promise<any> {
    const query = searchInfo;
    const newUserData = newData;

    if (newUserData.password) {
      const saltRounds = 15;
      // Encrypt new password
      const hashedPassword = await bcrypt.hash(
        newUserData.password as string,
        saltRounds
      );
      newUserData.password = hashedPassword;
    }

    return knex("user").where(query).update(newUserData, "*");
  }
}

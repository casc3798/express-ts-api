import { knexInstance } from "../../../../database/connection/database";
import * as request from "supertest";
import app from "../../../../app";

describe("Create user", () => {
  let knex: any;
  const userInfo = {
    firstname: "FirstName SecondName",
    lastname: "Lastname1 Lastname2",
    nickname: "Nickname",
    email: "email_test@email.com",
    phone: "1111111111 ext 421",
    country: "Colombia",
    city: "Bogota",
    language: "ES",
    time_zone: "GMT-5",
    image: "https://testProfileImage.com/png",
    password: "MyTestPassword",
  };
  beforeAll(() => {
    knex = knexInstance;
  });
  afterAll((done) => {
    knex.destroy(done);
  });
  it("Should create a new user in database", async () => {
    const response = await request
      .default(app)
      .post("/api/v1/user")
      .set({ authorization: `Bearer ${process.env.DUMMY_TOKEN}` })
      .send(userInfo);

    expect(response.statusCode).toBe(201);
  });
  it("Should fail to create a new user because password validations", async () => {
    const userInfoMod = userInfo;
    userInfoMod.nickname = "Nickname2";
    userInfoMod.email = "email_test2@email.com";
    userInfoMod.password = "asd";
    const response = await request
      .default(app)
      .post("/api/v1/user")
      .set({ authorization: `Bearer ${process.env.DUMMY_TOKEN}` })
      .send(userInfoMod);

    expect(response.statusCode).toBe(400);
  });
});

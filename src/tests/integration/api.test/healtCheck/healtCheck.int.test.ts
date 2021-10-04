import * as request from "supertest";
import app from "../../../../app";

describe("Test the healthcheck endpoint /api/v1/", () => {
  test("It should response the GET method", async () => {
    const response = await request.default(app).get("/api/v1/");
    expect(response.statusCode).toBe(200);
  });
});

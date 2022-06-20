import { agent as request } from "supertest";
import { createApp } from "../../../../app";
import { prismaMock } from "../../../helpers/prisma.mock";

describe("Ping Controller", () => {
  test("Ping succefuly", (done) => {
    request(createApp(prismaMock))
      .get("/ping")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe("pong");
        expect(response.body.status).toBeTruthy();
        done();
      })
      .catch((err) => done(err));
  });
});

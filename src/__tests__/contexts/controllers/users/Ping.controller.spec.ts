import { agent as request } from "supertest";
import { createApp } from "../../../../app";
import { prismaMock } from "../../../helpers/prisma.mock";

describe("Ping Controller", () => {
  test("Ping succefuly", async () => {
    const result = await request(createApp(prismaMock))
      .get("/ping")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(result.body.message).toBe("pong");
    expect(result.body.status).toBeTruthy();
  });
});

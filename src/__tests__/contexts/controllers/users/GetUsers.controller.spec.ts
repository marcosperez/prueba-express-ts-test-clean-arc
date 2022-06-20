import { agent as request } from "supertest";
import { createApp } from "../../../../app";
import { prismaMock } from "../../../helpers/prisma.mock";
import { Express } from "express";
import { objectWithTheSameFields } from "../../../helpers/mock.utils";

describe("Get Users Controller", function () {
  let app: Express = createApp(prismaMock);

  test("Get users succefuly without filters", (done) => {
    prismaMock.users.findMany.mockResolvedValue([
      {
        id: 666,
        username: "pepeeee1234",
        passwordHash: "asdasdasdasd",
        email: "pepeeee@gmail.com",
        name: "Pepeeeeer Perez",
        address: "corriente",
        street: "calle falsa 123",
        suite: "14 C",
        city: "Santelmo",
        zipcode: "4401",
        phone: "+54 362 5436815",
        website: "http://www.paginafalsa.com.ar",
      },
    ]);
    prismaMock.users.count.mockResolvedValue(1);

    request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        console.log(response.body);
        expect(true).toBeTruthy();
        expect(response.body.count).toBe(1);
        expect(response.body.list[0].id).toBe(666);
        done();
      })
      .catch((err) => done(err));
  });

  test("Get users succefuly with filter", (done) => {
    prismaMock.users.findMany
      .calledWith(
        objectWithTheSameFields({
          where: {
            OR: {
              username: { contains: "1234" },
              name: { contains: "1234" },
              email: { contains: "1234" },
            },
          },
          take: 10,
          skip: 0,
        })
      )
      .mockResolvedValue([
        {
          id: 665,
          username: "test1234",
          passwordHash: "12312312",
          email: "test@gmail.com",
          name: "Tester Perez",
          address: "corriente",
          street: "calle falsa 123",
          suite: "14 C",
          city: "Santelmo",
          zipcode: "4401",
          phone: "+54 362 5436815",
          website: "http://www.paginafalsa.com.ar",
        },
        {
          id: 666,
          username: "pepeeee1234",
          passwordHash: "12345678",
          email: "pepeeee@gmail.com",
          name: "Pepeeeeer Perez",
          address: "corriente",
          street: "calle falsa 123",
          suite: "14 C",
          city: "Santelmo",
          zipcode: "4401",
          phone: "+54 362 5436815",
          website: "http://www.paginafalsa.com.ar",
        },
      ]);
    prismaMock.users.count.mockResolvedValue(2);

    request(app)
      .get("/users")
      .query({ filter: "1234" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        console.log(response.body);
        expect(true).toBeTruthy();
        expect(response.body.count).toBe(2);
        expect(response.body.list[0].id).toBe(665);
        done();
      })
      .catch((err) => done(err));
  });
});

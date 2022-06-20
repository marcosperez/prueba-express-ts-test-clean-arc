import { User } from "../../../../contexts/domain/users/User.domain";
import { UserRepository } from "../../../../contexts/infrastructure/users/User.repository";
import { prismaMock } from "../../../helpers/prisma.mock";
import { LoginUserService } from "../../../../contexts/application/users/LoginUser.application";
import { objectWithTheSameFields } from "../../../helpers/mock.utils";

describe("Tests for LoginUser Service ", () => {
  const service = new LoginUserService(new UserRepository(prismaMock));

  beforeEach(async () => {
    const testUser = {
      id: 666,
      username: "test1234",
      passwordHash: await User.hashPassword("12345678"),
      email: "test@gmail.com",
      name: "Tester Perez",
      address: "corriente",
      street: "calle falsa 123",
      suite: "14 C",
      city: "Santelmo",
      zipcode: "4401",
      phone: "+54 362 5436815",
      website: "http://www.paginafalsa.com.ar",
    };

    prismaMock.users.findFirst
      .calledWith(
        objectWithTheSameFields({
          where: {
            username: "test1234",
          },
        })
      )
      .mockResolvedValue(testUser);
  });

  test("Login succefuly", async () => {
    const [ok, token] = await service.execute({
      password: "12345678",
      login: "test1234",
    });

    expect(ok).toBeTruthy();
    expect(token).not.toBeUndefined();
  });

  test("Login Failed", async () => {
    const [ok, token] = await service.execute({
      password: "87654321",
      login: "test1234",
    });

    expect(ok).toBeFalsy();
    expect(token).toBeUndefined();
  });

  test("Login Failed", async () => {
    // Pisa el resultado del find first

    prismaMock.users.findFirst.mockResolvedValue(null);
    const [ok, token] = await service.execute({
      password: "12345678",
      login: "test1234",
    });

    expect(ok).toBeFalsy();
    expect(token).toBeUndefined();
  });
});

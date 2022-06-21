import { RegisterUserService } from "../../../../contexts/application/users/RegisterUser.application";
import { User } from "../../../../contexts/domain/users/User.domain";
import { UserRepository } from "../../../../contexts/infrastructure/users/User.repository";
import { prismaMock } from "../../../helpers/prisma.mock";

describe("Tests for RegisterUser Service ", () => {
  // beforeEach(async () => {

  // });

  test("Register succefuly", async () => {
    const newUser = {
      id: 1000,
      username: "marcosp222",
      passwordHash: await User.hashPassword("12345678"),
      email: "marcos.d.perez@gmail.com",
      name: "Marcos Perez",
      address: null,
      street: null,
      suite: null,
      city: null,
      zipcode: null,
      phone: null,
      website: null,
    };

    prismaMock.users.create.mockResolvedValue(newUser);

    const service = new RegisterUserService(new UserRepository(prismaMock));
    const registerUser = {
      username: "marcosp222",
      password: "12345678",
      passwordConfirmation: "12345678",
      email: "marcos.d.perez@gmail.com",
      name: "Marcos Perez",
      address: undefined,
      street: undefined,
      suite: undefined,
      city: undefined,
      zipcode: undefined,
      phone: undefined,
      website: undefined,
    };

    const [ok, user] = await service.execute(registerUser);
    console.log(user);

    expect(ok).toBeTruthy();
    expect(user).not.toBeUndefined();
  });
});

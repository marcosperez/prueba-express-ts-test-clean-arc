import { User } from "../../../../contexts/domain/users/User.domain";
import { UserRepository } from "../../../../contexts/infrastructure/users/User.repository";
import { prismaMock } from "../../../helpers/prisma.mock";
import { GetUsersService } from "../../../../contexts/application/users/GetUsers.application";
import { objectWithTheSameFields } from "../../../helpers/mock.utils";

describe("Tests for Get Users Service ", () => {
  const service = new GetUsersService(new UserRepository(prismaMock));

  test("GetUsers find by username", async () => {
    prismaMock.users.findMany
      .calledWith(
        objectWithTheSameFields({
          where: {
            OR: {
              username: { contains: "pepeeee" },
              name: { contains: "pepeeee" },
              email: { contains: "pepeeee" },
            },
          },
          take: 2,
          skip: 0,
        })
      )
      .mockResolvedValue([
        {
          id: 666,
          username: "pepeeee1234",
          passwordHash: await User.hashPassword("12345678"),
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

    const [ok, page] = await service.execute({
      filter: "pepeeee",
      page: 1,
      pageSize: 2,
    });

    console.log(page);

    expect(ok).toBeTruthy();
    expect(page).not.toBeUndefined();
    expect(page?.list.length).toEqual(1);
    expect(page?.count).toEqual(1);
  });

  test("GetUsers find by username", async () => {
    prismaMock.users.count.mockResolvedValue(5);
    prismaMock.users.findMany
      .calledWith(objectWithTheSameFields({ where: {}, take: 2, skip: 0 }))
      .mockResolvedValue([
        {
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
        },
        {
          id: 666,
          username: "pepeeee1234",
          passwordHash: await User.hashPassword("12345678"),
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
        // {
        //   id: 667,
        //   username: "test7",
        //   passwordHash: await User.hashPassword("75678"),
        //   email: "test_7@gmail.com",
        //   name: "Tester Perez 7",
        //   address: "corriente",
        //   street: "calle falsa 7",
        //   suite: "17 C",
        //   city: "Santelmo7",
        //   zipcode: "4407",
        //   phone: "+54 362 5436817",
        //   website: "http://www.paginafalsa7.com.ar",
        // },
        // {
        //   id: 668,
        //   username: "test8",
        //   passwordHash: await User.hashPassword("85688"),
        //   email: "test_8@gmail.com",
        //   name: "Tester Perez 8",
        //   address: "corriente",
        //   street: "calle falsa 8",
        //   suite: "18 C",
        //   city: "Santelmo8",
        //   zipcode: "4408",
        //   phone: "+54 362 5436818",
        //   website: "http://www.paginafalsa8.com.ar",
        // },
        // {
        //   id: 669,
        //   username: "test9",
        //   passwordHash: await User.hashPassword("95699"),
        //   email: "test_9@gmail.com",
        //   name: "Tester Perez 9",
        //   address: "corriente",
        //   street: "calle falsa 9",
        //   suite: "19 C",
        //   city: "Santelmo9",
        //   zipcode: "4409",
        //   phone: "+54 362 5436919",
        //   website: "http://www.paginafalsa9.com.ar",
        // },
      ]);

    const [ok, page] = await service.execute({
      page: 1,
      pageSize: 2,
    });

    console.log(page);

    expect(ok).toBeTruthy();
    expect(page).not.toBeUndefined();
    expect(page?.list.length).toEqual(2);
    expect(page?.count).toEqual(5);
  });
});

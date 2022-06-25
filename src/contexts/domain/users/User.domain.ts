import { Maybe } from "../../context.common";
import { UserContactData } from "./UserContactData.domain";
import bcrypt from "bcrypt";
import { UserDTO } from "./UserDTO.domain";
import { sign } from "jsonwebtoken";
import { JWTPayload } from "./JWTPayload.domain";
const tokenSecret = process.env.TOKEN_SECRET || "secreto123?@";

export class User {
  id: Maybe<number>;
  name: string;
  username: string;
  passwordHash: string;
  email: string;
  address: Maybe<UserContactData>;

  constructor(params: {
    id: Maybe<number>;
    name: string;
    username: string;
    email: string;
    passwordHash: string;
    street: Maybe<string>;
    suite: Maybe<string>;
    city: Maybe<string>;
    zipcode: Maybe<string>;
    phone: Maybe<string>;
    website: Maybe<string>;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.passwordHash = params.passwordHash;
    this.username = params.username;
    this.email = params.email;

    this.address = new UserContactData(
      params.street,
      params.suite,
      params.city,
      params.zipcode,
      params.phone,
      params.website
    );
  }

  persistData() {
    return {
      id: this.id || undefined,
      name: this.name,
      username: this.username,
      email: this.email,
      street: this.address?.street,
      suite: this.address?.suite,
      city: this.address?.city,
      zipcode: this.address?.zipcode,
      phone: this.address?.phone,
      website: this.address?.website,
      passwordHash: this.passwordHash,
    };
  }

  static toUserDTO(user: User): UserDTO {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      street: user.address?.street,
      suite: user.address?.suite,
      city: user.address?.city,
      zipcode: user.address?.zipcode,
      phone: user.address?.phone,
      website: user.address?.website,
    };
  }

  static async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  static async comparePassword(hash: string, password: string) {
    return await bcrypt.compare(password, hash);
  }

  static generateJWT(payload: JWTPayload) {
    console.log("tokenSecret: ", tokenSecret);
    return sign(payload, tokenSecret, { expiresIn: "1800s" });
  }
}

import { Maybe } from "../../context.common";
import { UserContactData } from "./UserContactData.domain";

export interface UserParams {
  id: number;
  name: Maybe<string>;
  username: Maybe<string>;
  email: Maybe<string>;
  street: Maybe<string>;
  suite: Maybe<string>;
  city: Maybe<string>;
  zipcode: Maybe<string>;
  phone: Maybe<string>;
  website: Maybe<string>;
}

export class User {
  id: number;
  name: Maybe<string>;
  username: Maybe<string>;
  email: Maybe<string>;
  address: Maybe<UserContactData>;

  constructor(params: UserParams) {
    this.id = params.id;
    this.name = params.name;
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
      id: this.id,
      name: this.name,
      username: this.username,
      email: this.email,
      street: this.address?.street,
      suite: this.address?.suite,
      city: this.address?.city,
      zipcode: this.address?.zipcode,
      phone: this.address?.phone,
      website: this.address?.website,
    };
  }

  static create(params: UserParams) {
    const user = new User(params);

    return user;
  }
}

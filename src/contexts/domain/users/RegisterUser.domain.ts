import { Maybe } from "../../context.common";

export interface RegisterUser {
  username: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  email: string;
  street: Maybe<string>;
  suite: Maybe<string>;
  city: Maybe<string>;
  zipcode: Maybe<string>;
  phone: Maybe<string>;
  website: Maybe<string>;
}

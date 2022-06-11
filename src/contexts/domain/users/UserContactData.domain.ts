import { Maybe } from "../../context.common";

export class UserContactData {
  street: Maybe<string>;
  suite: Maybe<string>;
  city: Maybe<string>;
  zipcode: Maybe<string>;
  phone: Maybe<string>;
  website: Maybe<string>;

  constructor(
    street: Maybe<string>,
    suite: Maybe<string>,
    city: Maybe<string>,
    zipcode: Maybe<string>,
    phone: Maybe<string>,
    website: Maybe<string>
  ) {
    this.street = street;
    this.suite = suite;
    this.city = city;
    this.zipcode = zipcode;
    this.phone = phone;
    this.website = website;
  }
}

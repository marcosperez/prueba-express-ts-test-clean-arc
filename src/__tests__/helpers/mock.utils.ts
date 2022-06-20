import { Matcher } from "jest-mock-extended";
import { isEqual } from "lodash";

export const objectWithTheSameFields = <T>(expectedValue: T) =>
  new Matcher<T | unknown>((actualValue) => {
    return isEqual(actualValue, expectedValue);
  }, "different fields");

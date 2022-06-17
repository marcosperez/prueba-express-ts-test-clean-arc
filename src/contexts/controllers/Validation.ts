import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const DefaultSchema = Joi.object();

function Validator(
  type: "query" | "headers" | "body",
  schema: Joi.ObjectSchema<any> = DefaultSchema
) {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schema.validate(req[type]);
    console.log("[Validator][" + type + "] Validation");
    console.log(error);
    if (error !== undefined) {
      res.status(400).json({
        status: false,
        message: error?.message,
      });

      return;
    }

    req[type] = value;
    next();
  };
}

export function ValidatorBody(schema: Joi.ObjectSchema<any> = DefaultSchema) {
  return Validator("body", schema);
}

export function ValidatorQuery(schema: Joi.ObjectSchema<any> = DefaultSchema) {
  return Validator("query", schema);
}

export function ValidatorHeaders(
  schema: Joi.ObjectSchema<any> = DefaultSchema
) {
  return Validator("headers", schema);
}

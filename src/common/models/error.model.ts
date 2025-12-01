import { HttpStatus } from "../constants";

export type CommonError = {
  code: `${string}.${string}`;
  statusCode: HttpStatus;
  description: string;
};

export const CommonErrors = {
  ValidationError: {
    code: "common.validation_error",
    statusCode: HttpStatus.BadRequest,
    description: "One of the fields did not pass validation.",
  },
} satisfies Record<string, CommonError>;

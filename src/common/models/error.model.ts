import type { HttpStatus } from "../constants";

export type CommonError = {
  code: `${string}.${string}`;
  statusCode: HttpStatus;
  description: string;
};

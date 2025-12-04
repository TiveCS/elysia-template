import z, { type ZodError } from "zod";
import { CommonErrors } from "../errors";
import type { CommonError } from "./error.model";

export type SuccessResult<TData extends string | number | object = never> = {
  success: true;
  data: TData;
};

export type FailureResult = {
  success: false;
  error: {
    code: CommonError["code"];
    description: CommonError["description"];
    details?: string[];
  };
};

export type Result<TData extends string | number | object = never> =
  | SuccessResult<TData>
  | FailureResult;

export function ok<TData extends string | number | object = never>(
  data: TData,
): SuccessResult<TData> {
  return {
    success: true,
    data,
  };
}

export function failure(error: CommonError, details?: string[]): FailureResult {
  return {
    success: false,
    error: {
      ...error,
      details,
    },
  };
}

export function ValidationError(zodError: ZodError): FailureResult {
  return {
    success: false,
    error: {
      code: CommonErrors.ValidationError.code,
      description: CommonErrors.ValidationError.description,
      details: z.treeifyError(zodError).errors,
    },
  };
}

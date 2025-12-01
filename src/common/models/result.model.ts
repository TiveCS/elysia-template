import type { CommonError } from "./error.model";

export type SuccessResult<T extends string | number | object = never> = {
  success: true;
  data: T;
};

export type FailureResult = {
  success: false;
  error: {
    code: CommonError["code"];
    description: CommonError["description"];
    details?: string[];
  };
};

export type Result<T extends string | number | object = never> =
  | SuccessResult<T>
  | FailureResult;

import { FieldError } from "../generated/graphql";
import { errorMap } from "../types";

export const toErrorMap = (errors: FieldError[]): errorMap => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ field, message }) => {
        errorMap["field"] = field;
        errorMap["message"] = message;
    });
    return errorMap;
};

import { ValidationError } from "../utils/ApiError.js";

export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formattedErrors = result.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message
      }));

      return next(
        new ValidationError("Invalid request data", formattedErrors)
      );
    }

    req.body = result.data;
    next();
  };
};

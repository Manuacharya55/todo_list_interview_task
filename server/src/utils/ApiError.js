// ====================================================================== //
// Base ApiError Definition for REST API Responses                        //
// @params [statusCode, message, errors, stack]                           //
// @return [ApiError instance]                                            //
// ====================================================================== //
class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// ====================================================================== //
// BadRequestError Subclass Definition (400)                              //
// @params [message, errors]                                              //
// @return [BadRequestError instance]                                     //
// ====================================================================== //
class BadRequestError extends ApiError {
  constructor(message = "Bad Request", errors = []) {
    super(400, message, errors);
  }
}

// ====================================================================== //
// NotFoundError Subclass Definition (404)                                //
// @params [message, errors]                                              //
// @return [NotFoundError instance]                                       //
// ====================================================================== //
class NotFoundError extends ApiError {
  constructor(message = "Todo not found", errors = []) {
    super(404, message, errors);
  }
}

// ====================================================================== //
// ValidationError Subclass Definition (422)                              //
// @params [message, errors]                                              //
// @return [ValidationError instance]                                     //
// ====================================================================== //
class ValidationError extends ApiError {
  constructor(message = "Validation Error", errors = []) {
    super(422, message, errors);
  }
}

// ====================================================================== //
// InternalServerError Subclass Definition (500)                          //
// @params [message, errors]                                              //
// @return [InternalServerError instance]                                 //
// ====================================================================== //
class InternalServerError extends ApiError {
  constructor(message = "Internal Server Error", errors = []) {
    super(500, message, errors);
  }
}

export {
  ApiError,
  BadRequestError,
  NotFoundError,
  ValidationError,
  InternalServerError
};

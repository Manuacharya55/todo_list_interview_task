// ====================================================================== //
// Standardized ApiSuccess Response Definition                            //
// @params [statusCode, data, message]                                    //
// @return [ApiSuccess instance]                                          //
// ====================================================================== //
class ApiSuccess {
  constructor(statusCode = 200, data = null, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiSuccess };

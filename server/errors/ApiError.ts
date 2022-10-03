export class ApiError extends Error {
  status;
  errors;
  constructor(status: number, message: string, errors?: any[]) {
    super();
    this.status = status;
    this.message = message;
    this.errors = errors;
  }

  static badRequest(
    message: string = 'Sorry! This is a bad request',
    errors?: any[]
  ) {
    return new ApiError(400, message, errors);
  }

  static forbidden(message: string) {
    return new ApiError(403, message);
  }

  static unauthorized() {
    return new ApiError(401, 'User is unauthorized');
  }
}

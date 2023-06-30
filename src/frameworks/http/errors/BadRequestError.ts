export class BadRequestError extends Error {
  code: string;
  status: number;
  message: string;
  constructor(data?: any, message?: string) {
    super();
    this.code = 'BAD_REQUEST';
    this.status = 400;
    this.message = JSON.stringify({
      code: this.code,
      status: this.status,
      message: message || 'Bad Request',
      value: data,
    });

    Error.captureStackTrace(this, this.constructor);
  }
}

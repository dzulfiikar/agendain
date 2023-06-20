export class UnauthorizedError extends Error {
  code: string;
  status: number;
  message: string;
  constructor(data?: any, message?: string) {
    super();
    this.code = 'UNAUTHORIZED';
    this.status = 401;
    this.message = JSON.stringify({
      code: this.code,
      status: this.status,
      message: message || 'Unauthorized',
      value: data,
    });
  }
}

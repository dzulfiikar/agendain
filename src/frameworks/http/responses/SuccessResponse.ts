export class SuccessResponse extends Response {
  constructor(body?: any, message?: string) {
    super(
      JSON.stringify({
        code: 200,
        status: 'OK',
        message: message || null,
        value: body,
      }),
      {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

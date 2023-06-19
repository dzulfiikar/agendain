export class CreatedResponse extends Response {
  constructor(body?: any, message?: string) {
    super(
      JSON.stringify({
        code: 201,
        status: 'CREATED',
        message: message || null,
        value: body,
      }),
      {
        status: 201,
        statusText: 'CREATED',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

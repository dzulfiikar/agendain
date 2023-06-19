export class UnauthorizedResponse extends Response {
  constructor(body: any) {
    super(
      JSON.stringify({
        body,
      }),
      {
        status: 401,
        statusText: 'Unauthorized',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

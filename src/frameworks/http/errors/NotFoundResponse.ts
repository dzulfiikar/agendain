export class NotFoundResponse extends Response {
  constructor(body: any) {
    super(
      JSON.stringify({
        body,
      }),
      {
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

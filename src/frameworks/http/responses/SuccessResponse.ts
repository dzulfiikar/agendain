export class SuccessResponse extends Response {
  constructor(body: any) {
    super(
      JSON.stringify({
        body,
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

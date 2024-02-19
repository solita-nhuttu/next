export async function GET(request: Request) {
  return new Response(
    `Hello, ${request.url}!, is process defined or not? ${process.env.AZURE_CONNECTION_STRING?.substring(0, 7) ?? "It was not"} and then length ${process.env.AZURE_CONNECTION_STRING?.length} and test env: ${process.env.TEST_ENV}`,
  );
}

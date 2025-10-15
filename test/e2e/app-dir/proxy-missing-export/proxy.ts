// Should be proxy, but is middleware which will throw an error.
export function middleware() {
  return new Response('Hello, world!')
}

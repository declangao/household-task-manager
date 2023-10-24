export { default } from 'next-auth/middleware';

export const config = {
  // *: zero or more parameters
  // +: one or more parameters
  // ?: zero or one parameter
  matcher: ['/tasks/new', '/tasks/edit/:id+'],
};

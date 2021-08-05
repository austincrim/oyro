import { isValidSession } from '$lib/auth'
import cookie from 'cookie'

const AUTHORIZED_PATHS = ['/', '/budgets', '/transactions']

/**
 * @type {import('@sveltejs/kit').Handle}
 */
export const handle = async ({ request, resolve }) => {
  const response = await resolve(request)
  const sessionCookie = request.headers.cookie
    ? cookie.parse(request.headers.cookie)
    : null

  if (AUTHORIZED_PATHS.includes(request.path)) {
    if (!(await isValidSession(sessionCookie?.session_id))) {
      return {
        ...response,
        status: 302,
        headers: {
          location: '/login'
        }
      }
    }
  }

  return response
}

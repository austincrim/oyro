import { getUser, isValidSession, refreshSession } from '$lib/auth'
import cookie from 'cookie'

const AUTHORIZED_PATHS = ['/', '/budgets', '/transactions', '/api/transactions']

/**
 * @type {import('@sveltejs/kit').Handle}
 */
export const handle = async ({ request, resolve }) => {
  const sessionCookie = request.headers.cookie
    ? cookie.parse(request.headers.cookie)
    : null

  if (AUTHORIZED_PATHS.includes(request.path)) {
    if (!(await isValidSession(sessionCookie?.session_id))) {
      return {
        ...(await resolve(request)),
        status: 302,
        headers: {
          location: '/login'
        }
      }
    }
    try {
      await refreshSession(sessionCookie?.session_id)
    } catch (e) {
      console.error('swallowing session error')
    }
    const user = await getUser(sessionCookie?.session_id)
    request.locals.user = {
      email: user.email,
      items: user.items.map((item) => ({
        itemId: item.itemId
      }))
    }
  }

  return resolve(request)
}

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession = (request) => {
  return request.locals.user
}

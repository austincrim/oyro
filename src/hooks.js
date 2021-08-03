import cookie from 'cookie'

/**
 * @type {import('@sveltejs/kit').Handle}
 */
export const handle = async ({ request, resolve }) => {
  const response = await resolve(request)
  const sessionId = request.headers.cookie ? cookie.parse(request.headers.cookie) : null
  if (request.path === '/login') {
    if (sessionId) {
      request.locals.sessionId = sessionId
      return {
        ...response,
        status: 307,
        headers: {
          location: 'http://localhost:3000/'
        }
      }
    }
  } else {
    if (!sessionId) {
      return {
        ...response,
        status: 307,
        headers: {
          location: 'http://localhost:3000/login'
        }
      }
    }
  }

  return response
}

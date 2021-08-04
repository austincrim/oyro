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
          location: '/'
        }
      }
    }
  } else {
    if (!sessionId) {
      if (request.path === '/api/token') {
        return response
      }
      return {
        ...response,
        status: 307,
        headers: {
          location: '/login'
        }
      }
    }
  }

  return response
}

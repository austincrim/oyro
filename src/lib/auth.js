import prisma from '$lib/prisma'

export async function isValidSession(sessionId) {
  if (!sessionId) return false
  const session = await prisma.session.findUnique({
    where: {
      id: sessionId
    }
  })

  return session && session.expiresAt > Date.now()
}

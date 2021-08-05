import prisma from '$lib/prisma'

export async function refreshSession(sessionId) {
  if (!sessionId) throw new Error('must provide a sessionId')

  await prisma.session.update({
    where: {
      id: sessionId
    },
    data: {
      expiresAt: Date.now() + 1000 * 60 * 20 // 20 minutes from latest request
    }
  })
}

export async function isValidSession(sessionId) {
  if (!sessionId) return false
  const session = await prisma.session.findUnique({
    where: {
      id: sessionId
    }
  })

  return session && session.expiresAt > Date.now()
}

export async function getUser(sessionId) {
  if (!sessionId) return null

  const { user } = await prisma.session.findUnique({
    where: {
      id: sessionId
    },
    include: {
      user: {
        select: {
          email: true,
          items: true
        }
      }
    }
  })

  return user
}

export async function getAccessToken(email, itemId) {
  if (!email || !itemId) throw new Error('must provide args')
  const [item] = await prisma.user
    .findUnique({
      where: {
        email
      }
    })
    .items({ where: { itemId } })
  return item.accessToken
}

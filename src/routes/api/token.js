import client from '$lib/plaid'
import prisma from '$lib/prisma'

/**
 * @type {import('@sveltejs/kit/types').RequestHandler}
 */
export const post = async ({ body, locals }) => {
  try {
    if (body?.public_token) {
      const user = locals.user
      const { access_token, item_id } = await getAccessToken(body.public_token)
      await saveItem({
        accessToken: access_token,
        itemId: item_id,
        user
      })
      return {
        status: 302,
        headers: {
          location: '/transactions'
        }
      }
    }
    const request = {
      user: {
        client_user_id: locals.user.email
      },
      client_name: 'Oyro',
      products: ['transactions'],
      language: 'en',
      webhook: 'https://webhook.example.com',
      country_codes: ['US']
    }
    const createTokenResponse = await client.linkTokenCreate(request)
    return {
      body: createTokenResponse.data
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500
    }
  }
}

async function getAccessToken(publicToken) {
  try {
    const { data } = await client.itemPublicTokenExchange({
      public_token: publicToken
    })
    return data
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data, null, 2))
  }
}

async function saveItem({ accessToken, itemId, user }) {
  const item = await prisma.plaidItem.create({
    data: {
      accessToken,
      itemId,
      user: {
        connect: {
          email: user.email
        }
      }
    }
  })
  return item
}

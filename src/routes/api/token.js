import client from '$lib/plaid'
import * as fs from 'fs'
import { v4 as uuid } from '@lukeed/uuid'

/**
 * @type {import('@sveltejs/kit/types').RequestHandler}
 */
export const post = async ({ body }) => {
  if (body.public_token) {
    const session_id = await getAccessToken(body.public_token)
    return {
      status: 200,
      headers: {
        'set-cookie': `session_id=${session_id}; HttpOnly; Secure`
      }
    }
  }
  const request = {
    user: {
      client_user_id: 'abc'
    },
    client_name: 'Fungify',
    products: ['transactions'],
    language: 'en',
    webhook: 'https://webhook.example.com',
    country_codes: ['US']
  }
  try {
    const createTokenResponse = await client.linkTokenCreate(request)
    return {
      body: createTokenResponse.data
    }
  } catch (error) {
    console.error(JSON.stringify(error, null, 2))
    return {
      status: 500
    }
  }
}

export function getCachedAccessToken(session_id) {
  if (fs.existsSync('./token.json')) {
    const tokens = JSON.parse(fs.readFileSync('./token.json').toString())
    if (tokens[session_id]) return tokens[session_id]
  }
  return null
}

async function getAccessToken(publicToken) {
  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken
    })
    const session_id = uuid()
    fs.writeFileSync(
      './token.json',
      JSON.stringify({
        [session_id]: response.data.access_token
      })
    )
    return session_id
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data, null, 2))
  }
}

import cookie from 'cookie'
import client from '$lib/plaid'
import { getCachedAccessToken } from './token'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const get = async ({ headers }) => {
  const sessionId = headers.cookie ? cookie.parse(headers.cookie).session_id : null
  const accessToken = getCachedAccessToken(sessionId)
  const t = await fetchTransactions(accessToken)
  
  return {
    status: 200,
    body: t
  }
}

async function fetchTransactions(accessToken) {
  const request = {
    access_token: accessToken,
    start_date: '2021-07-01',
    end_date: '2021-08-02'
  }
  try {
    const response = await client.transactionsGet(request)
    return response.data.transactions
  } catch (err) {
    console.error(err)
  }
}

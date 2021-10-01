import { getAccessToken } from '$lib/auth'
import client from '$lib/plaid'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ query, locals }) => {
	const itemId = locals.user.items[0].itemId
	const offset = query.get('offset')
	const accessToken = await getAccessToken(locals.user.email, itemId)
	const t = await fetchTransactions(accessToken, Number(offset))

	return {
		status: 200,
		body: JSON.stringify(t)
	}
}

const cache = new Map()
async function fetchTransactions(accessToken, offset = 0) {
	if (cache.has(accessToken + offset)) {
		console.log('cache hit!');
		return cache.get(accessToken + offset)
	}
	const formatter = new Intl.DateTimeFormat('fr-CA')
	/** @type {import('plaid').TransactionsGetRequest} */
	const request = {
		access_token: accessToken,
		start_date: formatter.format(new Date(Date.now() - 1000 * 3600 * 24 * 30 * 12)),
		end_date: formatter.format(new Date()),
		options: {
			count: 30,
			offset
		}
	}
	try {
		const response = await client.transactionsGet(request)
		cache.set(accessToken + offset, response.data.transactions)
		return response.data.transactions
	} catch (err) {
		console.error(err.response.data)
	}
}

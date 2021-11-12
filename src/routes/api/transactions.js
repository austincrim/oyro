import { getAccessToken } from '$lib/auth'
import client from '$lib/plaid'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ query, locals }) => {
	const itemId = locals.user.items[0].itemId
	const offset = query.get('offset')
	const accessToken = await getAccessToken(locals.user.email, itemId)
	const t = await fetchTransactions(accessToken, Number(offset))

	if (t.error_code === 'PRODUCT_NOT_READY') {
		return {
			status: 202
		}
	}

	return {
		status: 200,
		body: JSON.stringify(t)
	}
}

async function fetchTransactions(accessToken, offset = 0) {
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
		return response.data.transactions
	} catch (err) {
		console.error(err.response.data)
		return err.response.data
	}
}

import { getAccessToken } from '$lib/auth'
import client from '$lib/plaid'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ query, locals }) => {
	const itemId = query.get('itemId')
	const accessToken = await getAccessToken(locals.user.email, itemId)
	const t = await fetchTransactions(accessToken)

	return {
		status: 200,
		body: t
	}
}

async function fetchTransactions(accessToken) {
	const formatter = new Intl.DateTimeFormat('fr-CA')
	const request = {
		access_token: accessToken,
		start_date: formatter.format(new Date(Date.now() - 1000 * 3600 * 24 * 30)),
		end_date: formatter.format(new Date())
	}
	try {
		const response = await client.transactionsGet(request)
		return response.data.transactions
	} catch (err) {
		console.error(err.response.data)
	}
}

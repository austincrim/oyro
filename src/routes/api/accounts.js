import { getAllAccessTokens } from '$lib/auth'
import client from '$lib/plaid'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ locals }) => {
	const tokens = await getAllAccessTokens(locals.user.email)

	const accounts = await fetchAccounts(tokens)

	return {
		status: 200,
		body: accounts
	}
}

async function fetchAccounts(tokens) {
	try {
		const responses = await Promise.all(
			tokens.map((token) => client.accountsGet({ access_token: token }))
		)
		return responses.flatMap((response) => response.data.accounts)
	} catch (err) {
		console.error(err)
	}
}

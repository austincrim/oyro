<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ fetch, session }) => {
		if (session?.items?.length > 0) {
			const res = await fetch(`/api/transactions?itemId=${session.items[0].itemId}`)
			return {
				props: {
					transactions: await res.json()
				}
			}
		}

		return {
			props: {
				transactions: []
			}
		}
	}
</script>

<script>
	import { initLink } from '$lib/plaid-link'
	/** @type {import('plaid').Transaction[]} */
	export let transactions = []

	$: total = transactions.filter((t) => t.amount >= 0).reduce((acc, t) => (acc += t.amount), 0)
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	})

	async function initiateLink() {
		const linkHandler = await initLink()
		linkHandler.open()
	}
</script>

<svelte:head>
	<script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
</svelte:head>

<h1>Transactions</h1>
{#if transactions.length > 0}
	<ul>
		{#each transactions as t}
			<li>
				<div class="column">
					<div class="merchant">{t.name}</div>
					<div class="categories">{t.category.join(' | ')}</div>
				</div>
				<span class="amount">
					{formatter.format(t.amount)}
				</span>
			</li>
		{/each}
		<li class="total">
			<span>Total</span>
			<span>{formatter.format(total)}</span>
		</li>
	</ul>
{:else}
	<div class="empty">
		<button on:click={initiateLink} data-type="primary"> Add an account </button>
	</div>
{/if}

<style>
	ul {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		padding-block: 4rem;
	}

	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid lightgrey;
		padding: 2rem 1rem;
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.categories {
		font-weight: 200;
	}

	.amount {
		font-weight: bold;
	}

	.total {
		font-weight: bold;
	}

	.empty {
		height: 70%;
		display: grid;
		place-content: center;
	}
</style>

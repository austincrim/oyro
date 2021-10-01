<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ fetch, session }) => {
		if (session?.items?.length > 0) {
			const res = await fetch('/api/transactions')
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
	/** @type {import('plaid').Transaction[]} */
	export let transactions = []

	import { initLink } from '$lib/plaid-link'
	import { fade } from 'svelte/transition'

	/** @type {import('plaid').Transaction[]} */
	let paginatedTransactions = JSON.parse(JSON.stringify(transactions))
	let offset = 0
	$: total = paginatedTransactions
		.filter((t) => t.amount >= 0)
		.reduce((acc, t) => (acc += t.amount), 0)

	const STATE = { LOADING: 'LOADING', ERROR: 'ERROR', SUCCESS: 'SUCCESS' }
	let status = STATE.SUCCESS
	const numberFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	})
	const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })

	async function initiateLink() {
		const linkHandler = await initLink()
		linkHandler.open()
	}

	async function fetchMore() {
		status = STATE.LOADING
		offset += 100
		const res = await fetch(`/api/transactions?offset=${offset}`)
		const t = await res.json()
		paginatedTransactions = [...paginatedTransactions, ...t]
		status = STATE.SUCCESS
	}
</script>

<svelte:head>
	<script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
</svelte:head>

<h1>Transactions</h1>
{#if paginatedTransactions.length > 0}
	<ul>
		{#each paginatedTransactions as t (t.transaction_id)}
			<li in:fade={{ duration: 500 }}>
				<div class="column">
					<div class="merchant">{t.name}</div>
					<div class="categories">{t.category.join(' | ')}</div>
				</div>
				<div class="column">
					<div class="amount">
						{numberFormatter.format(t.amount)}
					</div>
					<div>
						{dateFormatter.format(new Date(t.date))}
					</div>
				</div>
			</li>
		{/each}
		<li class="total">
			<span>Total</span>
			<span>{numberFormatter.format(total)}</span>
		</li>
	</ul>
	<button
		class:loading={status === STATE.LOADING}
		on:click={fetchMore}
		class="more"
		data-type="primary">Load more</button
	>
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
		align-self: flex-end;
	}

	.total {
		font-weight: bold;
	}

	.empty {
		height: 70%;
		display: grid;
		place-content: center;
	}

	.more {
		margin: 0 auto 4rem;
		width: 100%;
	}

	.loading {
		opacity: 0.3;
		cursor: not-allowed;
	}
</style>

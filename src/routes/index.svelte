<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ fetch, session }) => {
		if (session?.items?.length > 0) {
			const res = await fetch('/api/accounts')
			if (res.ok) {
				return {
					props: {
						accounts: await res.json()
					}
				}
			}
		}

		return {
			props: {
				accounts: []
			}
		}
	}
</script>

<script>
	/** @type {import('plaid').AccountBase[]}*/
	export let accounts = []

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	})
</script>

<h1>Dashboard</h1>

{#if accounts.length > 0}
	<ul>
		{#each accounts as account}
			<li>
				<div>
					<span>
						{account.official_name}
					</span>
					<span>
						{account.mask}
					</span>
				</div>
				<div style="font-weight: bold;">
					{formatter.format(account.balances.current)}
				</div>
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		margin-top: 4rem;
	}
	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>

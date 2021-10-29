<script>
	import { page, session } from '$app/stores'
</script>

<nav>
	<span class="brand"><a href="/">Oyro</a></span>
	<ul>
		{#if $session?.email}
			<li>
				<a sveltekit:prefetch class:active={$page.path === '/'} href="/">Dashboard</a>
			</li>
			<li>
				<a class:active={$page.path === '/budgets'} href="/budgets">Budgets</a>
			</li>
			<li>
				<a sveltekit:prefetch class:active={$page.path === '/transactions'} href="/transactions">
					Transactions
				</a>
			</li>
		{/if}
	</ul>
</nav>
<main>
	<slot />
</main>

<style>
	.brand {
		font-size: 3rem;
	}

	nav {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90px;
		padding: 0 4rem;
		border-bottom: 6px solid currentColor;
		font-size: 1.3rem;
	}

	a {
		transition: border-bottom-color 0.1s ease, padding-bottom 0.1s ease;
		border-bottom: 2px solid currentColor;
		border-bottom-color: #33333300;
	}

	li:hover a,
	li a:focus,
	.active {
		padding-bottom: 2px;
		border-bottom-color: currentColor;
	}

	ul {
		display: flex;
		gap: 2rem;
		list-style-type: none;
	}

	main {
		max-width: clamp(400px, 80vw, 1200px);
		margin: 0 auto;
		padding: 4rem;
		height: 100%;
	}
</style>
 
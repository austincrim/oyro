<script>
	import { page, session } from '$app/stores'
</script>

<nav>
	<span class="brand">Oyro</span>
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
	@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&display=swap');
	:root {
		--primary-opacity: 100%;

		--bg-primary: hsl(0 0% 15%);
		--bg-primary-hover: hsl(0 0% 25%);
		--text-primary: hsl(0 0% 95% / var(--primary-opacity));
		--link-primary: hsl(0 0% 15% / var(--primary-opacity));

		--radius: 7px;
		--text-2xl: 3rem;
		--text-xl: 2.5rem;
		--text-lg: 2rem;
		--text-md: 1rem;
		--text-sm: 0.75rem;
		
	}
	
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	
	:global(html, body, #svelte) {
		height: 100%;
		width: 100%;
		font-family: 'Baloo 2', sans-serif;
		font-size: 1.1rem;
	}

	:global(.text-lg) {
		font-size: var(--text-lg);
	}

	:global(.text-primary) {
		color: var(--text-primary);
	}

	:global(.column) {
		display: flex;
		flex-direction: column;
	}

	:global(input) {
		padding: 0.5rem;
		border-radius: var(--radius);
		border: 1px solid lightgrey;
	}

	:global(a) {
		color: var(--link-primary);
		text-decoration: none;
	}

	:global(li) {
		list-style: none;
	}

	:global(button) {
		cursor: pointer;
		font-size: 1.3rem;
		font-family: 'Baloo 2', sans-serif;
	}

	:global(button[data-type='primary']) {
		background-color: var(--bg-primary);
		color: var(--text-primary);
		padding: .5rem 1rem;
		border: 1px solid currentColor;
		border-radius: var(--radius);
		transition: background-color 0.1s ease;
	}

	:global(button[data-type='primary']):hover {
		background-color: var(--bg-primary-hover);
	}

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
	li:focus a,
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
 
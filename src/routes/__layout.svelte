<script>
	import { page, navigating, session } from '$app/stores'
</script>

<nav>
	<span class:loading={$navigating} class="brand">Oyro</span>
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
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

	:root {
		--primary-opacity: 100%;
		--text-opacity: 75%;
		--text-hover-opacity: 100%;

		--bg-primary: hsl(0 65% 61%);
		--bg-primary-hover: hsl(0 65% 61% / 75%);
		--text-link: hsl(0 0% 0% / var(--text-opacity));
		--text-link-hover: hsl(0 0% 0% / var(--text-hover-opacity));
		--text-primary: hsl(0 0% 97% / var(--primary-opacity));

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
		font-family: 'Noto Sans', sans-serif;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		/* color: var(--text-primary); */
	}

	:global(html, body, #svelte) {
		height: 100%;
		width: 100%;
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
		color: var(--text-primary);
		text-decoration: none;
	}

	:global(li) {
		list-style: none;
	}

	:global(button[data-type='primary']) {
		border: none;
		background-color: var(--bg-primary);
		color: var(--text-primary);
		padding: 1rem 2rem;
		border-radius: var(--radius);
		transition: background-color 0.1s ease;
		font-size: 1.1rem;
	}

	:global(button[data-type='primary']):hover {
		background-color: var(--bg-primary-hover);
	}

	.brand {
		color: var(--text-primary);
		font-size: 3rem;
	}

	nav {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--bg-primary);
		height: 70px;
		padding: 0 4rem;
		color: var(--text-primary);
	}

	a {
		transition: border-bottom-color 0.1s ease, padding-bottom 0.1s ease;
		border-bottom: 2px solid #fff;
		border-bottom-color: #ffffff00;
	}

	li:hover a,
	li:focus a,
	.active {
		padding-bottom: 2px;
		border-bottom-color: #fff;
	}

	ul {
		display: flex;
		gap: 2rem;
		list-style-type: none;
	}

	main {
		max-width: clamp(400px, 80vw, 1000px);
		margin: 0 auto;
		padding: 4rem;
		height: 100%;
	}

	.loading {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.2;
		}
	}
</style>

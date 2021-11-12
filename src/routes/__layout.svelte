<script>
	import { page, session } from '$app/stores'
</script>

<nav>
	<span class="brand">
		<a href="/" class="brand-text">
			<svg
				width="64"
				height="64"
				viewBox="0 0 64 64"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect width="64" height="64" fill="white" />
				<circle cx="32" cy="32" r="22.5" stroke="black" stroke-width="3" />
				<circle cx="32" cy="32" r="2" fill="black" />
				<circle cx="42" cy="22" r="2" fill="black" />
				<circle cx="42" cy="42" r="2" fill="black" />
				<circle cx="22" cy="42" r="2" fill="black" />
				<circle cx="22" cy="22" r="2" fill="black" />
				<line
					x1="22.1768"
					y1="21.8232"
					x2="42.1768"
					y2="41.8232"
					stroke="black"
					stroke-width="0.5"
				/>
				<line
					x1="42.1768"
					y1="22.1768"
					x2="22.1768"
					y2="42.1768"
					stroke="black"
					stroke-width="0.5"
				/>
			</svg>
			<span class="yro">yro</span>
		</a>
	</span>
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
	svg {
		transition: transform 0.2s ease;
		z-index: 0;
	}

	.brand-text:hover svg {
		transform-origin: center;
		transform: rotate(15deg);
	}

	.brand {
		font-size: 3rem;
	}

	.brand-text {
		display: flex;
		align-items: center;
	}

	.yro {
		margin-left: -5px;
		z-index: 1;
	}

	nav {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90px;
		padding: 0 4rem;
		border-bottom: 6px solid currentColor;
		font-size: 1.1rem;
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

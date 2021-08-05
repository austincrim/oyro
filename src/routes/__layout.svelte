<script>
  import { page, navigating, session } from '$app/stores'
</script>

<nav>
  <span class:loading={$navigating} class="brand">Oyro</span>
  <ul>
    {#if $session.user}
      <li>
        <a class:active={$page.path === '/'} href="/">Dashboard</a>
      </li>
      <li>
        <a class:active={$page.path === '/budgets'} href="/budgets">Budgets</a>
      </li>
      <li>
        <a class:active={$page.path === '/transactions'} href="/transactions">
          Transactions
        </a>
      </li>
    {:else}
      <li />
    {/if}
  </ul>
</nav>
<main>
  <slot />
</main>

<style>
  :root {
    --primary-opacity: 100%;
    --text-opacity: 75%;
    --text-hover-opacity: 100%;

    --bg-primary: 40 100% 77%;
    --text-link: hsl(0 0% 0% / var(--text-opacity));
    --text-link-hover: hsl(0 0% 0% / var(--text-hover-opacity));
    --text-primary: hsl(40 100% 15% / var(--primary-opacity));

    --radius: 7px;
  }

  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(h1, h2, h3, h4, h5, h6) {
    color: var(--text-primary);
  }

  .brand {
    color: var(--text-primary);
    font-size: 3rem;
    font-weight: 100;
  }

  nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: hsl(var(--bg-primary));
    height: 70px;
    padding: 0 4rem;
  }

  ul {
    display: flex;
    gap: 2rem;
    list-style-type: none;
  }

  main {
    max-width: clamp(400px, 70vw, 850px);
    margin: 0 auto;
    padding: 4rem;
  }

  a {
    text-decoration: none;
    color: var(--text-link);
    border-bottom: 2px solid #00000000;
    padding-bottom: 4px;
    transition: border-bottom 0.1s ease, padding-bottom 0.1s ease;
  }

  a:hover,
  .active {
    color: var(--text-link-hover);
    padding-bottom: 2px;
    border-bottom: 2px solid #00000099;
  }

  :global(input) {
    padding: 0.5rem;
    border-radius: var(--radius);
    border: 1px solid lightgrey;
  }

  :global(button[data-type='primary']) {
    border: none;
    background-color: hsl(var(--bg-primary) / 100%);
    --bg-hover: hsl(var(--bg-primary) / 75%);
    padding: 1rem 2rem;
    border-radius: var(--radius);
    transition: background-color .1s ease;
    font-size: 1.1rem;
  }

  :global(button[data-type='primary']):hover {
    background-color: var(--bg-hover);
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

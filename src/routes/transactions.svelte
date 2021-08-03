<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export const load = async ({ fetch }) => {
    const res = await fetch('/api/transactions')
    return {
      props: {
        transactions: res.json()
      }
    }
  }
</script>

<script>
  /**
   * @type {import('plaid').Transaction[]}
   */
  export let transactions = []

  $: total = transactions
    .filter((t) => t.amount >= 0)
    .reduce((acc, t) => (acc += t.amount), 0)
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
</script>

<h1>Transactions</h1>
<ul>
  {#each transactions as t}
    <li>
      <span>{t.name}</span>
      <span>
        {formatter.format(t.amount)}
      </span>
    </li>
  {/each}
  <li class="total">
    <span>Total</span>
    <span>{formatter.format(total)}</span>
  </li>
</ul>

<style>
  ul {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 75%;
    margin: 0 auto;
    padding-top: 4rem;
  }
  
  li {
    display: flex;
    justify-content: space-between;
  }

  .total {
    font-weight: bold;
  }
</style>

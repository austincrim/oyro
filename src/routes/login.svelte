<script>
  import { onMount } from 'svelte'

  onMount(async () => {
    const res = await fetch('/api/token', { method: 'POST' })
    const json = await res.json()

    if (json.link_token) {
      const linkHandler = Plaid.create({
        token: json.link_token,
        onSuccess: (public_token, metadata) => {
          // Send the public_token to your app server.
          fetch('/api/token', {
            method: 'POST',
            body: JSON.stringify({ public_token }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
        }
      })
      linkHandler.open()
    }
  })
</script>

<svelte:head>
  <script
    src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
</svelte:head>

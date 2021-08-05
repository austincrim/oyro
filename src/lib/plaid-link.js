export async function initLink() {
  const res = await fetch('/api/token', { method: 'POST' })
  const json = await res.json()

  if (json.link_token) {
    const linkHandler = Plaid.create({
      token: json.link_token,
      onSuccess: (public_token) => {
        fetch('/api/token', {
          method: 'POST',
          body: JSON.stringify({ public_token }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
    })

    return linkHandler
  }
}

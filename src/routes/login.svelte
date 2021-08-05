<main>
  <h1>Login to Oyro</h1>
  <form action="/api/login" method="POST">
    <label>
      Email
      <input name="email" type="email" />
    </label>
    <label>
      Password
      <input name="password" type="password" />
    </label>
    <button data-type="primary">Sign up</button>
  </form>
</main>

<style>
  main {
    max-width: 400px;
    margin: 0 auto;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 4rem 0;
    gap: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    gap: 0.5rem;
  }
</style>

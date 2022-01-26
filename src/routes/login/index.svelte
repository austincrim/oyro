<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect width="64" height="64" fill="white" />
	<circle cx="32" cy="32" r="22.5" stroke="black" stroke-width="3" />
	<circle cx="32" cy="32" r="2" fill="black" />
	<circle cx="42" cy="22" r="2" fill="black" />
	<circle cx="42" cy="42" r="2" fill="black" />
	<circle cx="22" cy="42" r="2" fill="black" />
	<circle cx="22" cy="22" r="2" fill="black" />
	<line x1="22.1768" y1="21.8232" x2="42.1768" y2="41.8232" stroke="black" stroke-width="0.5" />
	<line x1="42.1768" y1="22.1768" x2="22.1768" y2="42.1768" stroke="black" stroke-width="0.5" />
</svg>
<h1>Login to Oyro</h1>
<form action="/api/login" method="POST">
	<label>
		Email
		<input required name="email" type="email" />
	</label>
	<label>
		Password
		<input required name="password" type="password" />
	</label>
	<button data-type="primary">Sign up</button>
</form>

<style>
	svg {
		flex-shrink: 0;
		height: auto;
		width: 250px;
		aspect-ratio: 1 / 1;
		margin-inline: auto;
	}

	h1 {
		text-align: center;
	}

	form {
		display: flex;
		flex-direction: column;
		padding: 2rem 0;
		gap: 1rem;
	}

	label {
		display: flex;
		flex-direction: column;
		font-weight: bold;
		gap: 0.5rem;
	}
</style>

import prisma from '$lib/prisma'
// import argon from 'argon2'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const post = async ({ body }) => {
	const email = body.get('email')
	const password = body.get('password')

	if (!email || !password) {
		return {
			status: 400
		}
	}

	// const hashed = await argon.hash(password)
	const hashed = password + '123'

	let session, user

	user = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (user?.email) {
		// const match = await argon.verify(user.password, password)
		const match = user.password === password
		if (!match) {
			return {
				status: 400
			}
		}
	} else {
		user = await prisma.user.create({
			data: {
				email,
				password: hashed
			}
		})
	}

	session = await prisma.session.create({
		data: {
			user: { connect: { email: user.email } },
			expiresAt: Date.now() + 1000 * 60 * 20
		}
	})

	return {
		status: 302,
		headers: {
			'set-cookie': `session_id=${session.id}; Path=/; HttpOnly; Secure;`,
			location: '/'
		}
	}
}

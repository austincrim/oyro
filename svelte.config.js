import vercel from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		target: '#svelte',
		adapter: vercel({
			esbuild: (opts) => ({ ...opts, external: ['mock-aws-s3', 'aws-sdk', 'nock'] })
		}),
		vite: {
			ssr: {
				external: ['mock-aws-s3', 'aws-sdk', 'nock']
			}
		}
	}
}

export default config

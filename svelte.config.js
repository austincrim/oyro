import netlify from '@sveltejs/adapter-netlify'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		target: '#svelte',
		adapter: netlify({
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

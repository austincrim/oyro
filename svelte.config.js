import netlify from '@sveltejs/adapter-netlify'
import vercel from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		target: '#svelte',
		adapter: netlify({
			esbuild: (defaults) => {
				return {
					...defaults,
					external: ['mock-aws-s3', 'aws-sdk', 'nock']
				}
			}
		}),
		vite: {
			ssr: {
				external: ['mock-aws-s3', 'aws-sdk', 'nock']
			}
		}
	}
}

export default config

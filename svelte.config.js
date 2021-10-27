import node from '@sveltejs/adapter-node'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		target: '#svelte',
		prerender: {
			enabled: false
		},
		adapter: node()
	}
}

export default config

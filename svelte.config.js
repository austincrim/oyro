import netlify from '@sveltejs/adapter-netlify'
import vercel from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    target: '#svelte',
    adapter: netlify()
  }
}

export default config

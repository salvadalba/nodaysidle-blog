// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://no-days-idle-blog.netlify.app',
	output: 'server',
	adapter: netlify(),
	integrations: [
		mdx(),
		tailwind({
			applyBaseStyles: false
		}),
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
		})
	],
});

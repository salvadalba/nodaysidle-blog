// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://nodaysidle-blog.vercel.app',
	output: 'static',
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

// @ts-check

     import mdx from '@astrojs/mdx';
     import sitemap from '@astrojs/sitemap';
     import tailwind from '@astrojs/tailwind';
     import { defineConfig } from 'astro/config';

     // https://astro.build/config
     export default defineConfig({
        site: 'https://salvadalba.github.io',
        base: '/nodaysidle-blog',
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
        build: {
                assets: '_astro'
        },
        vite: {
                build: {
                        rollupOptions: {
                                output: {
                                        assetFileNames: '_astro/[name].[hash][extname]'
                                }
                        }
                }
        }
     });

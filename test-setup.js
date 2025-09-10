#!/usr/bin/env node

/**
 * NoDaysIdle Blog - Test Suite
 * Comprehensive testing for all blog features
 */

import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const tests = {
	passed: 0,
	failed: 0,
	results: []
};

function log(message, status = 'info') {
	const timestamp = new Date().toISOString();
	const colors = {
		success: '\x1b[32m',
		error: '\x1b[31m',
		warning: '\x1b[33m',
		info: '\x1b[36m',
		reset: '\x1b[0m'
	};

	console.log(`${colors[status]}[${timestamp}] ${message}${colors.reset}`);
}

async function test(name, testFn) {
	try {
		const result = await testFn();
		if (result === true || result === undefined) {
			tests.passed++;
			tests.results.push({ name, status: 'PASS' });
			log(`✅ ${name}`, 'success');
			return true;
		} else {
			tests.failed++;
			tests.results.push({ name, status: 'FAIL', error: result });
			log(`❌ ${name}: ${result}`, 'error');
			return false;
		}
	} catch (error) {
		tests.failed++;
		tests.results.push({ name, status: 'ERROR', error: error.message });
		log(`❌ ${name}: ${error.message}`, 'error');
		return false;
	}
}

// Test Suite
async function runTests() {
	log('🚀 Starting NoDaysIdle Blog Test Suite', 'info');

	// 1. File Structure Tests
	await test('Project structure exists', () => {
		const requiredFiles = [
			'package.json',
			'astro.config.mjs',
			'src/pages/index.astro',
			'src/lib/pocketbase.ts'
		];

		for (const file of requiredFiles) {
			if (!existsSync(file)) {
				throw new Error(`Missing required file: ${file}`);
			}
		}
		return true;
	});

	await test('Blog content directories exist', () => {
		const blogDirs = ['1_Blog', '2_Blog', '3_Blog'];
		for (const dir of blogDirs) {
			if (!existsSync(dir)) {
				throw new Error(`Missing blog directory: ${dir}`);
			}
		}
		return true;
	});

	// 2. Build Tests
	await test('Project builds successfully', () => {
		try {
			execSync('npm run build', { stdio: 'pipe' });
			return existsSync('dist');
		} catch (error) {
			throw new Error('Build failed: ' + error.message);
		}
	});

	// 3. PocketBase Tests
	await test('PocketBase server is running', async () => {
		try {
			await pb.health.check();
			return true;
		} catch (error) {
			throw new Error('PocketBase server not accessible');
		}
	});

	await test('PocketBase collections exist', async () => {
		try {
			const collections = await pb.collections.getFullList();
			const requiredCollections = ['blog_posts', 'admin_users', 'settings'];

			for (const collectionName of requiredCollections) {
				const collection = collections.find(c => c.name === collectionName);
				if (!collection) {
					throw new Error(`Missing collection: ${collectionName}`);
				}
			}
			return true;
		} catch (error) {
			throw new Error('Failed to check collections: ' + error.message);
		}
	});

	await test('Blog posts exist in database', async () => {
		try {
			const posts = await pb.collection('blog_posts').getList(1, 10);
			if (posts.items.length === 0) {
				throw new Error('No blog posts found in database');
			}
			log(`Found ${posts.items.length} blog posts`, 'info');
			return true;
		} catch (error) {
			throw new Error('Failed to fetch blog posts: ' + error.message);
		}
	});

	await test('Admin user exists', async () => {
		try {
			const admins = await pb.collection('admin_users').getList(1, 10);
			if (admins.items.length === 0) {
				throw new Error('No admin users found');
			}
			return true;
		} catch (error) {
			throw new Error('Failed to check admin users: ' + error.message);
		}
	});

	// 4. Content Tests
	await test('Multi-language content exists', async () => {
		try {
			const languages = ['en', 'it', 'sl'];
			for (const lang of languages) {
				const posts = await pb.collection('blog_posts').getList(1, 1, {
					filter: `language = "${lang}"`
				});
				if (posts.items.length === 0) {
					throw new Error(`No posts found for language: ${lang}`);
				}
			}
			return true;
		} catch (error) {
			throw new Error('Multi-language content check failed: ' + error.message);
		}
	});

	// 5. Configuration Tests
	await test('Astro config is valid', () => {
		try {
			const config = readFileSync('astro.config.mjs', 'utf8');
			if (!config.includes('@astrojs/netlify')) {
				throw new Error('Netlify adapter not configured');
			}
			if (!config.includes('site:')) {
				throw new Error('Site URL not configured');
			}
			return true;
		} catch (error) {
			throw new Error('Astro config validation failed: ' + error.message);
		}
	});

	await test('Package.json dependencies', () => {
		try {
			const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
			const requiredDeps = ['astro', 'pocketbase', '@astrojs/netlify'];

			for (const dep of requiredDeps) {
				if (!pkg.dependencies[dep]) {
					throw new Error(`Missing dependency: ${dep}`);
				}
			}
			return true;
		} catch (error) {
			throw new Error('Package.json validation failed: ' + error.message);
		}
	});

	// 6. SEO Tests
	await test('SEO files exist', () => {
		const seoFiles = ['public/robots.txt', 'src/pages/sitemap.xml.js'];
		for (const file of seoFiles) {
			if (!existsSync(file)) {
				throw new Error(`Missing SEO file: ${file}`);
			}
		}
		return true;
	});

	// 7. Theme Tests
	await test('CSS variables are defined', () => {
		try {
			const css = readFileSync('src/styles/global.css', 'utf8');
			const requiredVars = ['--primary', '--bg-primary', '--text-primary'];

			for (const varName of requiredVars) {
				if (!css.includes(varName)) {
					throw new Error(`Missing CSS variable: ${varName}`);
				}
			}
			return true;
		} catch (error) {
			throw new Error('CSS validation failed: ' + error.message);
		}
	});

	// Results Summary
	log(`\n📊 Test Results:`, 'info');
	log(`✅ Passed: ${tests.passed}`, 'success');
	log(`❌ Failed: ${tests.failed}`, tests.failed > 0 ? 'error' : 'info');
	log(`📈 Total: ${tests.passed + tests.failed}`, 'info');

	if (tests.failed > 0) {
		log('\n❌ Failed Tests:', 'error');
		tests.results
			.filter(result => result.status !== 'PASS')
			.forEach(result => {
				log(`  - ${result.name}: ${result.error || 'Unknown error'}`, 'error');
			});
		process.exit(1);
	} else {
		log('\n🎉 All tests passed! Your blog is ready for deployment.', 'success');
		process.exit(0);
	}
}

// Run the tests
runTests().catch(error => {
	log(`💥 Test suite failed: ${error.message}`, 'error');
	process.exit(1);
});
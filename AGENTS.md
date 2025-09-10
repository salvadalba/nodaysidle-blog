# AGENTS.md - NoDaysIdle Blog

This file contains essential information for coding agents working on the NoDaysIdle Blog project.

## Build & Development Commands

### Core Commands
- **Development server**: `npm run dev` - Starts Astro dev server with hot reload
- **Build**: `npm run build` - Builds the project for production
- **Preview**: `npm run preview` - Previews the built site locally

### Testing & Quality
- **Type checking**: `npx tsc --noEmit` - TypeScript type checking
- **Linting**: No dedicated linter configured (consider adding ESLint)
- **Single test**: No test framework configured (consider adding Vitest/Jest)

## Code Style Guidelines

### TypeScript Configuration
- **Strict mode**: Enabled with `strictNullChecks: true`
- **Target**: ES modules (`"type": "module"`)
- **Extends**: `astro/tsconfigs/strict`

### Import Organization
```typescript
// 1. Type imports first
import type { ImageMetadata } from 'astro';

// 2. External dependencies
import PocketBase from 'pocketbase';

// 3. Internal imports (components, utils, etc.)
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import FallbackImage from '../assets/blog-placeholder-1.jpg';
```

### Component Structure (Astro)
```astro
---
// Frontmatter: TypeScript code
interface Props {
  title: string;
  description: string;
  image?: ImageMetadata;
}

const { title, description, image } = Astro.props;
---

<!-- Template: HTML/JSX -->
<div class="component">
  <h1>{title}</h1>
  <p>{description}</p>
</div>

<style>
  /* Scoped styles */
  .component { /* styles */ }
</style>
```

### Naming Conventions
- **Components**: PascalCase (`BaseHead`, `BlogPost`, `HeaderLink`)
- **Variables/Functions**: camelCase (`calculateReadingTime`, `generateSlug`)
- **Types/Interfaces**: PascalCase (`BlogPost`, `AdminUser`)
- **Files**: PascalCase for components, kebab-case for pages
- **Constants**: UPPER_SNAKE_CASE (`SITE_TITLE`, `SITE_DESCRIPTION`)

### Error Handling
```typescript
// Async operations with try/catch
try {
  const posts = await blogApi.getPublishedPosts();
  // Handle success
} catch (error) {
  console.error('Failed to fetch posts:', error);
  // Handle error gracefully
}
```

### API Patterns
```typescript
// PocketBase API structure
export const blogApi = {
  async getPublishedPosts(options = {}) {
    // Implementation with proper error handling
  }
};
```

### Type Definitions
```typescript
// Comprehensive interfaces
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  language: 'en' | 'it' | 'sl';
  status: 'draft' | 'published' | 'scheduled';
  // ... other properties
}
```

### Astro-Specific Patterns
- Use `.astro` for page components and layouts
- Use TypeScript interfaces for component props
- Leverage Astro's built-in features (sitemap, RSS, etc.)
- Use `Astro.glob()` for content collections

### Multi-Language Support
- Support for EN/IT/SL languages
- Language-specific routes and content
- Proper hreflang attributes for SEO

### Security Considerations
- No hardcoded secrets or credentials
- Environment variables for sensitive data
- Proper input validation and sanitization
- CORS configuration for API endpoints

### Performance Best Practices
- Image optimization with Astro's built-in features
- Lazy loading for components when appropriate
- Efficient API calls with proper caching
- Minimize bundle size

## Project Structure
```
src/
├── components/     # Reusable Astro components
├── layouts/        # Page layout components
├── pages/          # Route-based pages
├── lib/           # Utility functions and API clients
├── content/       # Content collections (blog posts)
├── assets/        # Static assets (images, etc.)
└── styles/        # Global styles and CSS
```

## Deployment
- **Platform**: Netlify with Astro adapter
- **Build output**: `dist/` directory
- **Environment**: Node.js 20+
- **Domain**: Configured in `astro.config.mjs`

## Key Dependencies
- **Astro**: Static site generator with SSR support
- **PocketBase**: Backend-as-a-service for content management
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript
- **Sharp**: Image optimization
import PocketBase from 'pocketbase';

// Initialize PocketBase client
const pb = new PocketBase('http://127.0.0.1:8090');

// Enable auto-cancellation for real-time subscriptions
pb.autoCancellation(false);

// Types for our collections
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  language: 'en' | 'it' | 'sl';
  status: 'draft' | 'published' | 'scheduled';
  publish_date?: string;
  author: string;
  tags?: string[];
  featured_image?: string;
  seo_title?: string;
  seo_description?: string;
  reading_time?: number;
  series?: string;
  series_order?: number;
  created: string;
  updated: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'editor' | 'admin';
  permissions?: string[];
}

export interface SiteSettings {
  id: string;
  key: string;
  value: any;
  description?: string;
}

// Blog Posts API
export const blogApi = {
  // Get all published posts
  async getPublishedPosts(options: {
    language?: 'en' | 'it' | 'sl';
    limit?: number;
    offset?: number;
    sort?: string;
  } = {}) {
    const {
      language = 'en',
      limit = 10,
      offset = 0,
      sort = '-publish_date'
    } = options;

    const filter = `status = "published" && language = "${language}"`;
    return await pb.collection('blog_posts').getList(offset, limit, {
      filter,
      sort,
      fields: 'id,title,slug,excerpt,publish_date,author,tags,featured_image,reading_time,series,series_order'
    });
  },

  // Get a single post by slug
  async getPostBySlug(slug: string, language: 'en' | 'it' | 'sl' = 'en') {
    const filter = `slug = "${slug}" && language = "${language}" && status = "published"`;
    return await pb.collection('blog_posts').getFirstListItem(filter);
  },

  // Search posts
  async searchPosts(query: string, language: 'en' | 'it' | 'sl' = 'en') {
    const filter = `status = "published" && language = "${language}" && (title ~ "${query}" || content ~ "${query}" || excerpt ~ "${query}")`;
    return await pb.collection('blog_posts').getList(0, 50, {
      filter,
      sort: '-publish_date'
    });
  },

  // Get posts by tag
  async getPostsByTag(tag: string, language: 'en' | 'it' | 'sl' = 'en') {
    const filter = `status = "published" && language = "${language}" && tags ~ "${tag}"`;
    return await pb.collection('blog_posts').getList(0, 50, {
      filter,
      sort: '-publish_date'
    });
  },

  // Get posts by series
  async getPostsBySeries(series: string, language: 'en' | 'it' | 'sl' = 'en') {
    const filter = `status = "published" && language = "${language}" && series = "${series}"`;
    return await pb.collection('blog_posts').getList(0, 50, {
      filter,
      sort: 'series_order'
    });
  }
};

// Admin API (requires authentication)
export const adminApi = {
  // Authenticate admin user
  async login(email: string, password: string) {
    return await pb.collection('admin_users').authWithPassword(email, password);
  },

  // Get all posts (including drafts)
  async getAllPosts(options: {
    status?: string;
    language?: 'en' | 'it' | 'sl';
    limit?: number;
    offset?: number;
  } = {}) {
    const { status, language, limit = 50, offset = 0 } = options;

    let filter = '';
    if (status) filter += `status = "${status}"`;
    if (language) {
      if (filter) filter += ' && ';
      filter += `language = "${language}"`;
    }

    return await pb.collection('blog_posts').getList(offset, limit, {
      filter: filter || undefined,
      sort: '-updated'
    });
  },

  // Create a new post
  async createPost(postData: Omit<BlogPost, 'id' | 'created' | 'updated'>) {
    return await pb.collection('blog_posts').create(postData);
  },

  // Update a post
  async updatePost(id: string, postData: Partial<BlogPost>) {
    return await pb.collection('blog_posts').update(id, postData);
  },

  // Delete a post
  async deletePost(id: string) {
    return await pb.collection('blog_posts').delete(id);
  },

  // Upload file
  async uploadFile(file: File) {
    return await pb.collection('blog_posts').create({ file });
  }
};

// Settings API
export const settingsApi = {
  async getSetting(key: string) {
    return await pb.collection('settings').getFirstListItem(`key = "${key}"`);
  },

  async getAllSettings() {
    return await pb.collection('settings').getFullList();
  },

  async updateSetting(id: string, value: any) {
    return await pb.collection('settings').update(id, { value });
  }
};

// Utility functions
export const utils = {
  // Calculate reading time
  calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  },

  // Generate slug from title
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  // Format date
  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

// Export the PocketBase instance
export default pb;
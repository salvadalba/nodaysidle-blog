import PocketBase from 'pocketbase';

/**
 * PocketBase client instance initialized to connect to the local server.
 * @type {PocketBase}
 */
const pb = new PocketBase('http://127.0.0.1:8090');

// It's recommended to switch off auto-cancellation for long-lived real-time subscriptions.
pb.autoCancellation(false);

/**
 * Interface representing a blog post record from the 'blog_posts' collection.
 * @interface
 */
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

/**
 * Interface representing an admin user from the 'admin_users' collection.
 * @interface
 */
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'editor' | 'admin';
  permissions?: string[];
}

/**
 * Interface representing a site setting from the 'settings' collection.
 * @interface
 */
export interface SiteSettings {
  id:string;
  key: string;
  value: any;
  description?: string;
}

/**
 * API for interacting with the public-facing blog posts.
 */
export const blogApi = {
  /**
   * Fetches a list of published blog posts, with options for filtering and pagination.
   * @param {object} [options] - The options for fetching posts.
   * @param {'en' | 'it' | 'sl'} [options.language='en'] - The language of the posts to fetch.
   * @param {number} [options.limit=10] - The number of posts to return per page.
   * @param {number} [options.offset=0] - The starting offset for pagination.
   * @param {string} [options.sort='-publish_date'] - The field to sort by.
   * @returns {Promise<import('pocketbase').ListResult<BlogPost>>} A promise that resolves to the list of posts.
   */
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
    return await pb.collection('blog_posts').getList<BlogPost>(offset, limit, {
      filter,
      sort,
      fields: 'id,title,slug,excerpt,publish_date,author,tags,featured_image,reading_time,series,series_order'
    });
  },

  /**
   * Fetches a single published post by its slug and language.
   * @param {string} slug - The slug of the post.
   * @param {'en' | 'it' | 'sl'} [language='en'] - The language of the post.
   * @returns {Promise<BlogPost>} A promise that resolves to the post.
   */
  async getPostBySlug(slug: string, language: 'en' | 'it' | 'sl' = 'en'): Promise<BlogPost> {
    const filter = `slug = "${slug}" && language = "${language}" && status = "published"`;
    return await pb.collection('blog_posts').getFirstListItem<BlogPost>(filter);
  },

  /**
   * Searches for published posts by a query string.
   * @param {string} query - The search query.
   * @param {'en' | 'it' | 'sl'} [language='en'] - The language to search in.
   * @returns {Promise<import('pocketbase').ListResult<BlogPost>>} A promise that resolves to the list of matching posts.
   */
  async searchPosts(query: string, language: 'en' | 'it' | 'sl' = 'en') {
    const filter = `status = "published" && language = "${language}" && (title ~ "${query}" || content ~ "${query}" || excerpt ~ "${query}")`;
    return await pb.collection('blog_posts').getList<BlogPost>(0, 50, {
      filter,
      sort: '-publish_date'
    });
  },

  /**
   * Fetches published posts by a specific tag.
   * @param {string} tag - The tag to filter by.
   * @param {'en' | 'it' | 'sl'} [language='en'] - The language of the posts.
   * @returns {Promise<import('pocketbase').ListResult<BlogPost>>} A promise that resolves to the list of posts.
   */
  async getPostsByTag(tag: string, language: 'en' | 'it' | 'sl' = 'en') {
    const filter = `status = "published" && language = "${language}" && tags ~ "${tag}"`;
    return await pb.collection('blog_posts').getList<BlogPost>(0, 50, {
      filter,
      sort: '-publish_date'
    });
  },

  /**
   * Fetches published posts belonging to a specific series.
   * @param {string} series - The name of the series.
   * @param {'en' | 'it' | 'sl'} [language='en'] - The language of the posts.
   * @returns {Promise<import('pocketbase').ListResult<BlogPost>>} A promise that resolves to the list of posts.
   */
  async getPostsBySeries(series: string, language: 'en' | 'it' | 'sl' = 'en') {
    const filter = `status = "published" && language = "${language}" && series = "${series}"`;
    return await pb.collection('blog_posts').getList<BlogPost>(0, 50, {
      filter,
      sort: 'series_order'
    });
  }
};

/**
 * API for administrative actions, requires authentication.
 */
export const adminApi = {
  /**
   * Authenticates an admin user with email and password.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<any>} A promise that resolves on successful authentication.
   */
  async login(email: string, password: string) {
    return await pb.collection('admin_users').authWithPassword(email, password);
  },

  /**
   * Fetches all posts, including drafts and scheduled posts.
   * @param {object} [options] - Options for fetching posts.
   * @param {string} [options.status] - Filter by post status.
   * @param {'en' | 'it' | 'sl'} [options.language] - Filter by language.
   * @param {number} [options.limit=50] - The number of posts to return.
   * @param {number} [options.offset=0] - The starting offset.
   * @returns {Promise<import('pocketbase').ListResult<BlogPost>>} A promise that resolves to the list of posts.
   */
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

    return await pb.collection('blog_posts').getList<BlogPost>(offset, limit, {
      filter: filter || undefined,
      sort: '-updated'
    });
  },

  /**
   * Creates a new blog post.
   * @param {Omit<BlogPost, 'id' | 'created' | 'updated'>} postData - The data for the new post.
   * @returns {Promise<BlogPost>} A promise that resolves to the newly created post.
   */
  async createPost(postData: Omit<BlogPost, 'id' | 'created' | 'updated'>) {
    return await pb.collection('blog_posts').create<BlogPost>(postData);
  },

  /**
   * Updates an existing blog post.
   * @param {string} id - The ID of the post to update.
   * @param {Partial<BlogPost>} postData - The data to update.
   * @returns {Promise<BlogPost>} A promise that resolves to the updated post.
   */
  async updatePost(id: string, postData: Partial<BlogPost>) {
    return await pb.collection('blog_posts').update<BlogPost>(id, postData);
  },

  /**
   * Deletes a blog post.
   * @param {string} id - The ID of the post to delete.
   * @returns {Promise<void>} A promise that resolves when the post is deleted.
   */
  async deletePost(id: string) {
    return await pb.collection('blog_posts').delete(id);
  },

  /**
   * Uploads a file.
   * @param {File} file - The file to upload.
   * @returns {Promise<any>} A promise that resolves to the uploaded file record.
   */
  async uploadFile(file: File) {
    return await pb.collection('blog_posts').create({ file });
  }
};

/**
 * API for managing site settings.
 */
export const settingsApi = {
  /**
   * Retrieves a single setting by its key.
   * @param {string} key - The key of the setting to retrieve.
   * @returns {Promise<SiteSettings>} A promise that resolves to the setting.
   */
  async getSetting(key: string) {
    return await pb.collection('settings').getFirstListItem<SiteSettings>(`key = "${key}"`);
  },

  /**
   * Retrieves all site settings.
   * @returns {Promise<SiteSettings[]>} A promise that resolves to a list of all settings.
   */
  async getAllSettings() {
    return await pb.collection('settings').getFullList<SiteSettings>();
  },

  /**
   * Updates a setting's value.
   * @param {string} id - The ID of the setting to update.
   * @param {any} value - The new value for the setting.
   * @returns {Promise<SiteSettings>} A promise that resolves to the updated setting.
   */
  async updateSetting(id: string, value: any) {
    return await pb.collection('settings').update<SiteSettings>(id, { value });
  }
};

/**
 * A collection of utility functions.
 */
export const utils = {
  /**
   * Calculates the estimated reading time for a piece of content.
   * @param {string} content - The text content.
   * @returns {number} The estimated reading time in minutes.
   */
  calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  },

  /**
   * Generates a URL-friendly slug from a title.
   * @param {string} title - The title to convert.
   * @returns {string} The generated slug.
   */
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  /**
   * Formats a date string or Date object into a readable format.
   * @param {string | Date} date - The date to format.
   * @returns {string} The formatted date string (e.g., "September 10, 2025").
   */
  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

/**
 * The exported PocketBase client instance.
 */
export default pb;
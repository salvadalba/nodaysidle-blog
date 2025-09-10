import PocketBase from 'pocketbase';

// Initialize PocketBase
const pb = new PocketBase('http://127.0.0.1:8090');

// Authenticate as superuser
async function setupDatabase() {
  try {
    await pb.admins.authWithPassword('admin@nodaysidle.com', 'admin123');
    console.log('✅ Authenticated as superuser');

    // Create blog_posts collection
    const blogPostsCollection = await pb.collections.create({
      name: 'blog_posts',
      type: 'base',
      schema: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'text',
          required: true,
        },
        {
          name: 'excerpt',
          type: 'text',
        },
        {
          name: 'language',
          type: 'select',
          options: {
            values: ['en', 'it', 'sl']
          },
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          options: {
            values: ['draft', 'published', 'scheduled']
          },
          required: true,
        },
        {
          name: 'publish_date',
          type: 'date',
        },
        {
          name: 'author',
          type: 'text',
          required: true,
        },
        {
          name: 'tags',
          type: 'json', // Array of tags
        },
        {
          name: 'featured_image',
          type: 'file',
          options: {
            maxSelect: 1,
            maxSize: 5242880, // 5MB
          }
        },
        {
          name: 'seo_title',
          type: 'text',
        },
        {
          name: 'seo_description',
          type: 'text',
        },
        {
          name: 'reading_time',
          type: 'number',
        },
        {
          name: 'series',
          type: 'text',
        },
        {
          name: 'series_order',
          type: 'number',
        }
      ]
    });
    console.log('✅ Created blog_posts collection');

    // Create admin_users collection for additional admin users
    const adminUsersCollection = await pb.collections.create({
      name: 'admin_users',
      type: 'base',
      schema: [
        {
          name: 'username',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'role',
          type: 'select',
          options: {
            values: ['editor', 'admin']
          },
          required: true,
        },
        {
          name: 'permissions',
          type: 'json', // Array of permissions
        }
      ]
    });
    console.log('✅ Created admin_users collection');

    // Create settings collection for site configuration
    const settingsCollection = await pb.collections.create({
      name: 'settings',
      type: 'base',
      schema: [
        {
          name: 'key',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'json',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        }
      ]
    });
    console.log('✅ Created settings collection');

    // Add some default settings
    await pb.collection('settings').create({
      key: 'site_title',
      value: 'NoDaysIdle Blog',
      description: 'Main site title'
    });

    await pb.collection('settings').create({
      key: 'site_description',
      value: 'Exploring AI ethics and human responsibility',
      description: 'Site description for SEO'
    });

    await pb.collection('settings').create({
      key: 'posts_per_page',
      value: 10,
      description: 'Number of posts to display per page'
    });

    console.log('✅ Added default settings');
    console.log('🎉 Database setup complete!');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
  }
}

setupDatabase();
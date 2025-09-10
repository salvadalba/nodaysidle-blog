import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PocketBase from 'pocketbase';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize PocketBase
const pb = new PocketBase('http://127.0.0.1:8090');

async function importBlogContent() {
  try {
    // Authenticate as superuser
    await pb.admins.authWithPassword('admin@nodaysidle.com', 'admin123');
    console.log('✅ Authenticated as superuser');

    // Import the first blog post
    const englishContent = fs.readFileSync(path.join(__dirname, '1_Blog', 'mirror-effect-english.md'), 'utf8');
    const italianContent = fs.readFileSync(path.join(__dirname, '1_Blog', 'mirror-effect-italian.md'), 'utf8');
    const slovenianContent = fs.readFileSync(path.join(__dirname, '1_Blog', 'mirror-effect-slovenian.md'), 'utf8');

    // Extract title from English content
    const titleMatch = englishContent.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1] : 'The Mirror Effect';

    // Create English post
    const englishPost = await pb.collection('blog_posts').create({
      title: title,
      slug: 'the-mirror-effect',
      content: englishContent,
      excerpt: englishContent.split('\n\n')[1]?.substring(0, 200) + '...',
      language: 'en',
      status: 'published',
      publish_date: '2025-09-10',
      author: 'NoDaysIdle',
      tags: ['AI Ethics', 'Bias', 'Human Responsibility'],
      seo_title: title,
      seo_description: 'Exploring how AI systems reflect human biases and the importance of accountability',
      reading_time: 8
    });
    console.log('✅ Created English blog post');

    // Create Italian post
    const italianPost = await pb.collection('blog_posts').create({
      title: 'L\'Effetto Specchio: Quando l\'IA Riflette i Nostri Pregiudizi',
      slug: 'the-mirror-effect',
      content: italianContent,
      excerpt: italianContent.split('\n\n')[1]?.substring(0, 200) + '...',
      language: 'it',
      status: 'published',
      publish_date: '2025-09-10',
      author: 'NoDaysIdle',
      tags: ['AI Ethics', 'Bias', 'Human Responsibility'],
      seo_title: 'L\'Effetto Specchio: Quando l\'IA Riflette i Nostri Pregiudizi',
      seo_description: 'Esplorando come i sistemi AI riflettono i pregiudizi umani e l\'importanza della responsabilità',
      reading_time: 8
    });
    console.log('✅ Created Italian blog post');

    // Create Slovenian post
    const slovenianPost = await pb.collection('blog_posts').create({
      title: 'Zrcalni Učinek: Ko Umetna Inteligenca Odraža Naše Lastne Predsodke',
      slug: 'the-mirror-effect',
      content: slovenianContent,
      excerpt: slovenianContent.split('\n\n')[1]?.substring(0, 200) + '...',
      language: 'sl',
      status: 'published',
      publish_date: '2025-09-10',
      author: 'NoDaysIdle',
      tags: ['AI Ethics', 'Bias', 'Human Responsibility'],
      seo_title: 'Zrcalni Učinek: Ko Umetna Inteligenca Odraža Naše Lastne Predsodke',
      seo_description: 'Raziskovanje, kako sistemi UI odražajo človeške predsodke in pomen odgovornosti',
      reading_time: 8
    });
    console.log('✅ Created Slovenian blog post');

    console.log('🎉 Content import complete!');

  } catch (error) {
    console.error('❌ Error importing content:', error);
  }
}

importBlogContent();
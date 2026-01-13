import { notFound } from 'next/navigation';
import { getBlogById } from '@/lib/firebase';
import styles from './page.module.css';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    return {
      title: 'Blog Post Not Found | BellyBuys Enterprise',
    };
  }

  return {
    title: `${blog.title} | BellyBuys Enterprise`,
    description: blog.excerpt || blog.content?.substring(0, 160) || 'Read our latest blog post from BellyBuys Enterprise.',
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.content?.substring(0, 160),
      images: blog.imageUrl ? [{ url: blog.imageUrl }] : [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.author}>{blog.author || 'BellyBuys'}</span>
            <span className={styles.dot}>•</span>
            <span className={styles.date}>{formatDate(blog.createdAt)}</span>
          </div>

          <h1 className={styles.title}>{blog.title}</h1>

          {blog.excerpt && (
            <p className={styles.excerpt}>{blog.excerpt}</p>
          )}
        </header>

        {blog.imageUrl && (
          <div className={styles.imageContainer}>
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className={styles.image}
            />
          </div>
        )}

        <div className={styles.content}>
          {blog.content && (
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          )}
        </div>

        <footer className={styles.footer}>
          <div className={styles.backLink}>
            <a href="/blog">← Back to Blog</a>
          </div>
        </footer>
      </div>
    </article>
  );
}
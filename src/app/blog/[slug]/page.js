import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { getBlogs } from '@/lib/firebase';

export async function generateMetadata({ params }) {
  const blogs = await getBlogs(true);
  const blog = blogs.find(b => b.id === params.slug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${blog.title} | BellyBuys Blog`,
    description: blog.excerpt || blog.content?.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.content?.substring(0, 160),
      images: blog.imageUrl ? [blog.imageUrl] : [],
    },
  };
}

export default async function BlogPost({ params }) {
  const blogs = await getBlogs(true);
  const blog = blogs.find(b => b.id === params.slug);

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
        <Link href="/blog" className={styles.backLink}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Blog
        </Link>

        {blog.imageUrl && (
          <div className={styles.featuredImage}>
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              priority
              className={styles.image}
            />
          </div>
        )}

        <header className={styles.header}>
          {blog.category && (
            <span className={styles.category}>{blog.category}</span>
          )}
          <h1>{blog.title}</h1>
          <div className={styles.meta}>
            <span className={styles.author}>{blog.author || 'BellyBuys'}</span>
            <span className={styles.dot}>•</span>
            <span className={styles.date}>{formatDate(blog.createdAt)}</span>
          </div>
        </header>

        <div className={styles.content}>
          {blog.content?.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <footer className={styles.footer}>
          <div className={styles.share}>
            <h3>Share this post</h3>
            <div className={styles.shareButtons}>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareButton}
              >
                Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareButton}
              >
                Facebook
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareButton}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
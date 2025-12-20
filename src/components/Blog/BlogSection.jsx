'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './BlogSection.module.css';
import BlogCard from './BlogCard';
import BlogForm from './BlogForm';
import { getBlogs } from '@/lib/firebase';

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    const fetchedBlogs = await getBlogs(true);
    setBlogs(fetchedBlogs);
    setLoading(false);
  };

  return (
    <section className={styles.blog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.badge}>Our Blog</span>
            <h1>Latest Stories & Recipes</h1>
            <p>Discover cooking tips, recipes, and insights from our culinary experts</p>
          </div>
          <button 
            className={styles.writeButton}
            onClick={() => setShowForm(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Write a Post
          </button>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading posts...</p>
          </div>
        ) : blogs.length > 0 ? (
          <div className={styles.grid}>
            {blogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <h3>No posts yet</h3>
            <p>Be the first to share a story or recipe!</p>
            <button onClick={() => setShowForm(true)} className={styles.ctaButton}>
              Write First Post
            </button>
          </div>
        )}
      </div>

      {showForm && (
        <BlogForm 
          onClose={() => setShowForm(false)} 
          onSuccess={loadBlogs}
        />
      )}
    </section>
  );
}
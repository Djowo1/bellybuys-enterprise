'use client';

import { useState, useEffect } from 'react';
import styles from './BlogManager.module.css';
import { getBlogs, approveBlog, deleteBlog, updateBlog } from '@/lib/firebase';

export default function BlogManager({ onUpdate }) {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const fetchedBlogs = await getBlogs(false);
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error('Error loading blogs:', error);
      setBlogs([]);
    }
    setLoading(false);
  };

  const handleApprove = async (blogId) => {
    if (confirm('Approve this blog post?')) {
      const result = await approveBlog(blogId);
      if (result.success) {
        loadBlogs();
        onUpdate();
      }
    }
  };

  const handleDelete = async (blogId) => {
    if (confirm('Are you sure you want to delete this post? This cannot be undone.')) {
      const result = await deleteBlog(blogId);
      if (result.success) {
        loadBlogs();
        onUpdate();
      }
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    if (filter === 'pending') return !blog.approved;
    if (filter === 'approved') return blog.approved;
    return true;
  });

  return (
    <div className={styles.manager}>
      <div className={styles.header}>
        <h1>Blog Management</h1>
        <div className={styles.filters}>
          <button
            className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({blogs.length})
          </button>
          <button
            className={`${styles.filterButton} ${filter === 'pending' ? styles.active : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({blogs.filter(b => !b.approved).length})
          </button>
          <button
            className={`${styles.filterButton} ${filter === 'approved' ? styles.active : ''}`}
            onClick={() => setFilter('approved')}
          >
            Approved ({blogs.filter(b => b.approved).length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      ) : filteredBlogs.length > 0 ? (
        <div className={styles.list}>
          {filteredBlogs.map(blog => (
            <div key={blog.id} className={styles.blogItem}>
              <div className={styles.blogInfo}>
                <h3>{blog.title}</h3>
                <p>{blog.excerpt || blog.content?.substring(0, 100) + '...'}</p>
                <div className={styles.blogMeta}>
                  <span>{blog.author}</span>
                  <span>•</span>
                  <span>{blog.category}</span>
                  <span>•</span>
                  <span className={blog.approved ? styles.approved : styles.pending}>
                    {blog.approved ? 'Published' : 'Pending'}
                  </span>
                </div>
              </div>
              <div className={styles.blogActions}>
                {!blog.approved && (
                  <button
                    onClick={() => handleApprove(blog.id)}
                    className={styles.approveButton}
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(blog.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No blog posts found</p>
        </div>
      )}
    </div>
  );
}
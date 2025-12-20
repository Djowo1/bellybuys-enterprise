'use client';

import { useState } from 'react';
import { uploadImage, createBlog } from '@/lib/firebase';
import styles from './BlogForm.module.css';

export default function BlogForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    category: '',
    imageUrl: '',
    imageFile: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file, imageUrl: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      let imageUrl = formData.imageUrl;

      // Upload image if file selected
      if (formData.imageFile) {
        const uploadResult = await uploadImage(formData.imageFile, 'blog-images');
        if (uploadResult.success) {
          imageUrl = uploadResult.url;
        }
      }

      const blogData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        author: formData.author,
        category: formData.category,
        imageUrl: imageUrl || null
      };

      const result = await createBlog(blogData);

      if (result.success) {
        alert('Blog post submitted! It will be visible after admin approval.');
        onSuccess();
        onClose();
      } else {
        setError('Failed to create post. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Write a Blog Post</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title">Post Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter a catchy title..."
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="author">Your Name *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="Recipes">Recipes</option>
                <option value="Tips & Tricks">Tips & Tricks</option>
                <option value="Events">Events</option>
                <option value="Stories">Stories</option>
                <option value="News">News</option>
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="excerpt">Short Excerpt *</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows="2"
              placeholder="Brief summary (150 characters)"
              maxLength="150"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="8"
              placeholder="Write your post content here..."
            />
          </div>

          <div className={styles.field}>
            <label>Featured Image</label>
            <div className={styles.imageOptions}>
              <div className={styles.option}>
                <label htmlFor="imageFile" className={styles.fileLabel}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Upload Image
                </label>
                <input
                  type="file"
                  id="imageFile"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
              </div>

              <span className={styles.or}>OR</span>

              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Paste image URL"
                className={styles.urlInput}
                disabled={!!formData.imageFile}
              />
            </div>
            {formData.imageFile && (
              <p className={styles.fileName}>{formData.imageFile.name}</p>
            )}
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
              {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
            </button>
          </div>

          <p className={styles.note}>
            * Your post will be reviewed by our team before publishing.
          </p>
        </form>
      </div>
    </div>
  );
}
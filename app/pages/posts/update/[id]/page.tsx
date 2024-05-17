"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';  
import Layout from '../../../../components/layout/Layout';
import styles from '../../../../components/postsTable/PostsTable.module.css';
import { format } from 'date-fns'; 

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt : string;
}

const EditPost = () => {
  const router = useRouter();
  const { id } = useParams(); 
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (typeof id === 'string') {  
        try {
          const response = await fetch(`/pages/api/posts/${id}`, {
            method: 'GET'
          });
          const data = await response.json();
          if (data.success) {
            console.log('Fetched post:', data.data);
            const formattedPost = { ...data.data, createdAt: format(new Date(data.data.createdAt), 'yyyy-MM-dd HH:mm:ss') };
            setPost(formattedPost);
          }
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (post) {
      try {
        const response = await fetch(`/pages/api/posts/${post.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(post)
        });
        const data = await response.json();
        if (data.success) {
          router.push('/');
        } else {
          throw new Error(data.message || 'Failed to update the post');
        }
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost({ ...post!, [e.target.name]: e.target.value });
  };

  if (!post) return <div>Loading...</div>;

  return (
    <Layout>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={post.title} 
            onChange={(e) => setPost({ ...post, title: e.target.value })} // Update title property
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={post.content} 
            onChange={(e) => setPost({ ...post, content: e.target.value })} // Update content property
            className={styles.textarea}
            required
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="createdAt">Date Created</label>
          <input
            type="text"
            id="createdAt"
            value={post.createdAt}
            onChange={handleChange}
            className={styles.input}
            disabled // Disable input
          />
        </div>
        <button type="submit" className={styles.submitButton}>Update Post</button> {/* Corrected button label */}
      </form>
    </Layout>
  );
};

export default EditPost;

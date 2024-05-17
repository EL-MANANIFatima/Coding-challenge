"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';  
import Layout from '../../../../components/layout/Layout';
import styles from '../../../../components/postsTable/PostsTable.module.css';
import { format } from 'date-fns'; 
import { toast } from 'react-toastify';


interface Post {
  id: string;
  title: string;
  content: string;
  createdAt : string;
}

/*
This page is for updating a post as the name suggests
*/

const EditPost = () => {
  const router = useRouter();
  const { id } = useParams(); 
  const [post, setPost] = useState<Post | null>(null);

  /*
  This code fitches the post to update based on the id .
  */

  useEffect(() => {
    const fetchPost = async () => {
      if (typeof id === 'string') {  
        try {
          const response = await fetch(`/pages/api/posts/${id}`, {
            method: 'GET'
          });
          const data = await response.json();
          if (data.success) {
            const formattedPost = { ...data.data, createdAt: format(new Date(data.data.createdAt), 'yyyy-MM-dd HH:mm:ss') };
            setPost(formattedPost);
          }
        } catch (error) {
          toast.error('Error fetching the post ');
        }
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);  

  /*
  This code updates the post
  */
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
          toast.success(data.message);
        } else {
          toast.error('Error updating the post ');
           }
      } catch (error) {
        toast.error('Error updating the post ');
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
            onChange={(e) => setPost({ ...post, title: e.target.value })} 
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={post.content} 
            onChange={(e) => setPost({ ...post, content: e.target.value })} 
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
            disabled 
          />
        </div>
        <button type="submit" className={styles.submitButton}>Update Post</button> 

      </form>
    </Layout>
  );
};

export default EditPost;

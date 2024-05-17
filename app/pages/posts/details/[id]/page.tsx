"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';  
import Layout from '../../../../components/layout/Layout';
import styles from '../../../../../public/style.module.css';
import { format } from 'date-fns';

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const PostDetails = () => {
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

  if (!post) return <div>Loading...</div>;

  return (
    <Layout>
      <div className={styles.postDetailContainer}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <div className={styles.postDate}>{post.createdAt}</div>
        <p className={styles.postContent}>{post.content}</p>
        <button onClick={() => router.push('/')} className={styles.backButton}>Back to Posts</button>
      </div>
    </Layout>
  );
};

export default PostDetails;

"use client"; 
import { useEffect, useState } from 'react';
import Layout from './components/layout/Layout';
import PostsTable from './components/postsTable/PostTable';
interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function Home() {
  

 

  return (
    <Layout>
            <PostsTable /> 
        </Layout>
  );
}

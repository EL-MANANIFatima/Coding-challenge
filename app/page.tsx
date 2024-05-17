"use client"; 
import Layout from './components/layout/Layout';
import PostsTable from './components/postsTable/PostTable';


export default function Home() {
  return (
    <Layout>
      <PostsTable /> 
    </Layout>
  );
}

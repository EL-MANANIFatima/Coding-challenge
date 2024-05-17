import React, { useState, useEffect } from 'react';
import styles from './PostsTable.module.css';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Pagination from '../pagination/Pagination';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Post } from '@/app/types/intercaes';
import { fetchPosts, createPost, deletePost } from '@/utils/apiUtils';

//This components liste all the posts and defines a form to add new ones 
const PostsTable: React.FC = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  //Here we are fethcing all the posts using the function defined in apiUtils
  useEffect(() => {
    const fetchAllPosts = async () => {
      const result = await fetchPosts();
      if (result.success && result.posts) { 
        setPosts(result.posts);
        setFilteredPosts(result.posts);
      } else {
        toast.error(result.error || 'Error fetching posts');
      }
    };

    fetchAllPosts();
  }, []);


  //this code returns a small snippet of the posts so that it would be nice looking on the table
  const getSnippet = (content: string, wordLimit: number = 15) => {
    const words = content.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : content;
  };

  //This code redirects to the details page and it takes the post id with it 
  //Originaly , the idea was to pass the whole post since it's already fetched
  //but after seeing the best practices , i learn that it was best to send the id and re-fetch
  //rather than passing the whole post since sometimes it gets sent null
  const onViewDetails = (id: string) => {
    router.push(`/pages/posts/details/${id}`);
  };

  //This code redirects to the update page and it takes the post id with it 
  //The same explination for why only passing the id
  const onUpdate = (post: Post) => {
    router.push(`/pages/posts/update/${post.id}`);
  };

  //This code snippet handles the delete of a post by bassing the id to the 
  //defined in apiUtils 
  const onDelete = async (id: string) => {
    const result = await deletePost(id);
    if (result.success) {
      toast.success(result.message);
      setPosts(posts.filter(post => post.id !== id));
      setFilteredPosts(filteredPosts.filter(post => post.id !== id));
    } else {
      toast.error(result.error || 'Error deleting the post');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = { title: newPostTitle, content: newPostContent };

    //This code handles the creation of a new post
    const result = await createPost(newPost);
    if (result.success && result.post) {
      toast.success(result.message);
      setPosts([...posts, result.post]);
      setFilteredPosts([...filteredPosts, result.post]);
      setNewPostTitle('');
      setNewPostContent('');
    } else {
      toast.error(result.error || 'Failed to create post');
    }
  };

  //This  code handles the search functionality , it filters the posts based on the 
  //search input
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  //Params for the pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchQuery ? filteredPosts.slice(indexOfFirstPost, indexOfLastPost) : posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by title or content..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className={styles.searchBar}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>NO</th>
            <th className={styles.tableHeader}>Title</th>
            <th className={styles.tableHeader}>Snippet</th>
            <th className={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr key={post.id}>
              <td className={styles.tableCell}>{indexOfFirstPost + index + 1}</td>
              <td className={styles.tableCell}>{post.title}</td>
              <td className={styles.tableCell}>{getSnippet(post.content)}</td>
              <td className={styles.tableCell}>
                <button className={styles.actionButton} onClick={() => onViewDetails(post.id)}>
                  <FaEye />
                </button>
                <button className={styles.actionButton} onClick={() => onUpdate(post)}>
                  <FaEdit />
                </button>
                <button className={styles.actionButton} onClick={() => onDelete(post.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        totalItem={searchQuery ? filteredPosts.length : posts.length}
        perPage={postsPerPage}
        showItem={5}
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className={styles.textarea}
            required
          ></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>Add Post</button>
      </form>
    </div>
  );
};

export default PostsTable;

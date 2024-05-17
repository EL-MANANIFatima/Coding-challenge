import React, { useState, useEffect } from 'react';
import styles from './PostsTable.module.css';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Pagination from '../pagination/Pagination';
import { useRouter } from 'next/navigation'

interface Post {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const PostsTable: React.FC = () => {

    const router = useRouter();
    
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('pages/api/posts');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                console.log('Posts fetched:', data);
                setPosts(data.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setPosts([]);
            }
        };

        fetchPosts();
    }, []);

    const getSnippet = (content: string, wordLimit: number = 15) => {
        const words = content.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : content;
    };




    const onViewDetails = (post :Post) => {
        router.push(`/pages/posts/${post.id}`);    };

    const onDelete = async (id: string) => {
        try {
            const response = await fetch(`pages/api/posts/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                console.log('Post deleted:', data.data);
                setPosts(posts.filter(post => post.id !== id)); 
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newPost = { title: newPostTitle, content: newPostContent };

        try {
            const response = await fetch('pages/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost)
            });
            const data = await response.json();
            if (data.success) {
                console.log('Post created:', data.data);
                setPosts([...posts, data.data]);
                setNewPostTitle('');
                setNewPostContent('');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div>
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
                            <button className={styles.actionButton} onClick={() => onViewDetails(post)}>
                                <FaEye />
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
        totalItem={posts.length}
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

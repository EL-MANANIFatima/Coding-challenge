import { format } from 'date-fns';
import {Post , Result, manyResults} from '../app/types/intercaes';
/*
To avoide writing the same code in multiple pages , here I put all the API realted functions , 
this will avoid repetition as well as making it easy then a modification is needed
*/

//This function fetches a specific post based on passed Id 
export async function fetchPost(id: string): Promise<Result> {
    try {
        const response = await fetch(`pages/api/posts/${id}`, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch the post');
        }
        return { success: true, post: data.data };
    } catch (error) {
        return { success: false, error: 'Error updating post' };
    }
}



//This function update a certain post based on the provided id
export async function updatePost(post: Post): Promise<Result> {
try {
    const response = await fetch(`api/posts/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
    });
    const data = await response.json();
    if (!response.ok) {
    throw new Error(data.message || 'Failed to update the post');
    }
    return { success: true, message: data.message };
} catch (error) {
    return { success: false, error:  'Error updating post' };
}
}

//This function is uded to fetch all posts
export async function fetchPosts(): Promise<manyResults> {
    try {
      const response = await fetch('pages/api/posts');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch posts');
      }
      return { success: true, posts: data.data };
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || 'Error fetching posts';
      return { success: false, error: errorMessage };
    }
  }
  
//This one is used to create a new post 
export async function createPost(newPost: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Result> {
try {
    const response = await fetch('pages/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
    });
    const data = await response.json();
    if (!response.ok) {
    throw new Error(data.message || 'Failed to create post');
    }
    return { success: true, post: data.data, message: data.message };
} catch (error: unknown) {
    const errorMessage = (error as Error).message || 'Error creating post';
    return { success: false, error: errorMessage };
}
}

//This other function is used to delete a specefic post based on id
export async function deletePost(id: string): Promise<Result> {
try {
    const response = await fetch(`pages/api/posts/${id}`, {
    method: 'DELETE',
    });
    const data = await response.json();
    if (!response.ok) {
    throw new Error(data.message || 'Failed to delete post');
    }
    return { success: true, message: data.message };
} catch (error: unknown) {
    const errorMessage = (error as Error).message || 'Error deleting post';
    return { success: false, error: errorMessage };
}
}
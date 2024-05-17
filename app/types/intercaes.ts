/*
This file is used to define interfaces that would be used throughout the project in order to avoid 
repeating the same thing
*/

export interface Post {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt : string;
}
//This interface is used to handle the results of the diffrents methods used in this project
 export interface Result{
    success: boolean;
    post?: Post;
    error?: string;
    message?: string;
}
//for fetching all
export interface manyResults{
    success: boolean;
    posts?: Post[];
    error?: string;
    message?: string;
}
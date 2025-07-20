import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

export const getComments = (postId) => API.get(`/comment/${postId}`);
export const createComment = (commentData) => API.post('/comment', commentData);

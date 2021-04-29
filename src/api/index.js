import axios from 'axios';

// axios instants

const API = axios.create({baseURL: "http://localhost:5000/"})

//sent back our token to our backend to show we are logged im
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
}
return req;
})
// const url = 'http://localhost:5000/posts';

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`)

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
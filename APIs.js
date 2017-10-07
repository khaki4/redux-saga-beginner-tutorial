import axios from 'axios';

export const getPosts = () =>
  axios.get('http://reduxblog.herokuapp.com/api/posts?key=drhead')
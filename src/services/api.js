import axios from "axios";

const BASE_URL = "https://linkr-api-hhbp.onrender.com";

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function signInUser(body) {
  const promisse = axios.post(`${BASE_URL}/signin`, body);
  return promisse;
}

function signUpUser(body) {
  const promisse = axios.post(`${BASE_URL}/signup`, body);
  return promisse;
}

function getHashtags() {
  const promise = axios.get(`${BASE_URL}/hashtags`);
  return promise;
}

function getPostsByHashtag(name) {
  const promise = axios.get(`${BASE_URL}/posts/${name}`);
  return promise;
}

function getPosts() {
  const promise = axios.get(`${BASE_URL}/posts`);
  return promise;
}

function publishForm(postInfo, token) {
  const config = createConfig(token);
  const promisse = axios.post(`${BASE_URL}/posts`, postInfo,config);
  return promisse;
}

function delelePostById(id, token) {
  const config = createConfig(token);
  return axios.delete(`${BASE_URL}/posts/delete/${id}`, config);
}

const api = {
  getHashtags,
  getPostsByHashtag,
  signInUser,
  signUpUser,
  getPosts,
  publishForm,
  delelePostById
};

export default api;

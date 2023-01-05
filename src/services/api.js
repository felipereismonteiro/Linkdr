import axios from "axios";

const BASE_URL = "https://linkr-api-hhbp.onrender.com";

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function signInUser(body) {
  const promisse = axios.post(`${BASE_URL}/signin`, body)
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
const api = {
  getHashtags,
  getPostsByHashtag,
  signInUser,
  signUpUser
};

export default api;

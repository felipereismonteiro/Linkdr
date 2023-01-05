import axios from "axios";

const BASE_URL = "https://linkr-api-hhbp.onrender.com";

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function getHashtags() {
  const promise = axios.get(`${BASE_URL}/hashtags`);
  return promise;
}

function getPostsByHashtagId(id) {
  const promise = axios.get(`${BASE_URL}/hashtags/${id}`);
  return promise;
}
const api = {
  getHashtags,
  getPostsByHashtagId,
};

export default api;

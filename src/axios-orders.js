import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://le-panier-bio.firebaseio.com/'
});

export default instance;
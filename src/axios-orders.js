import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-ormy-01.firebaseio.com'
});

export default instance;
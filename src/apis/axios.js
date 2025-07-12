import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // .env에서 불러온 API 주소 (배포 시 주소 교체)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;

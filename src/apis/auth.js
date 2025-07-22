import instance from './axios';

export const login = async (code) => {
  const res = await instance.post('/auth/kakao', {
    code,
  });

  return res.data;
};

export const getCurrentUser = async () => {
  const res = await instance.get('/api/v1/auth/me');
  return res.data;
};

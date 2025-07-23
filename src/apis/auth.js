import instance from './axios';

export const login = async (code) => {
  const res = await instance.post('/auth/kakao', {
    code,
  });

  return res.data;
};

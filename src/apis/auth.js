import instance from './axios';

export const login = async (code) => {
  const res = await instance.post('/auth/kakao', {
    code,
  });

  return res.data;
};

export const getCurrentUser = async () => {
  const res = await instance.get('/auth/me'); // 실제 엔드포인트에 따라 수정 필요
  return res.data;
};

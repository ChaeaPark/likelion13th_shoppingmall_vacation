import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { login } from '../apis/auth';

const KakaoRedirect = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { setTokens } = useAuthStore();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    if (!code) {
      alert('인가 코드 없음');
      nav('/login');
      return;
    }

    const kakaoLogin = async () => {
      try {
        const { accessToken, refreshToken } = await login(code);
        setTokens(accessToken, refreshToken);
        nav('/main');
      } catch (error) {
        alert('로그인 실패 : ', error);
        nav('/login');
      }
    };
    kakaoLogin();

    console.log('카카오 인가 코드 : ', code);
  }, [location.search, nav]);

  return <>로딩중...</>;
};

export default KakaoRedirect;

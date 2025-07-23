import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

const KakaoRedirect = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { setTokens } = useAuthStore();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (!accessToken || !refreshToken) {
      alert('토큰 정보 없음');
      nav('/');
      return;
    }

    setTokens(accessToken, refreshToken);

    nav('/main');
  }, [location.search, nav]);

  return <>로딩중...</>;
};

export default KakaoRedirect;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRequiredModal = ({ onClose }) => {
  const navigate = useNavigate();

  // 외부 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // 모달 외부 클릭 감지
  const handleOverlayClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  const handleGoToLogin = () => {
    onClose();
    navigate('/');
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div className="bg-white p-8 rounded-xl shadow-xl w-[300px] text-center space-y-6">
        <h2 className="text-lg font-semibold text-gray-800">
          로그인이 필요한 기능입니다.
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400"
          >
            닫기
          </button>
          <button
            onClick={handleGoToLogin}
            className="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600"
          >
            로그인하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;

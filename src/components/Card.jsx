import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CommonButton from './CommonButton';
import img9 from '../assets/image9.png';
import { addToCart } from '../apis/cart';
import { useAuthStore } from '../stores/useAuthStore';
import LoginRequiredModal from './LoginRequiredModal';

export default function Card({ id, name, category, price }) {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    const itemToAdd = {
      productId: id,
      quantity: 1,
    };

    try {
      await addToCart(itemToAdd);
      alert('장바구니에 추가되었습니다!');
      navigate('/cart');
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      alert('장바구니 추가에 실패했습니다.');
    }
  };

  const handleCardClick = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-purple-300 overflow-hidden w-full border border-gray-200 cursor-pointer"
        onClick={handleCardClick}
      >
        <img
          src={img9}
          alt={name}
          className="w-25 h-25 object-cover items-center mx-auto p-4 md:p-6"
        />
        <div className="p-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500">{category}</p>
          <div className="mt-2 text-right text-indigo-600 font-semibold text-base md:text-lg">
            {price.toLocaleString()}원
          </div>

          {/* Add to Cart 버튼 */}
          <div onClick={handleAddToCart}>
            <CommonButton variant="main" type="button">
              장바구니
            </CommonButton>
          </div>
        </div>
      </div>

      {/* 로그인 필요 모달 */}
      {showLoginModal && (
        <LoginRequiredModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string,
  price: PropTypes.number.isRequired,
};

Card.defaultProps = {
  category: '',
};

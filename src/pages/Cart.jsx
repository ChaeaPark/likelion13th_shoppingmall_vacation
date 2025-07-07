import React from 'react';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../components/CommonButton';

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleClearCart = () => {
    if (confirm('장바구니를 비우시겠습니까?')) {
      setCartItems([]);
    }
  };

  const handleGoHome = () => {
    navigate('/main');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-8">
      {/* 배경 효과 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-purple-300 opacity-30 rounded-full blur-3xl top-[-100px] left-[-100px]" />
        <div className="absolute w-[300px] h-[300px] bg-indigo-300 opacity-30 rounded-full blur-2xl bottom-[-80px] right-[-60px]" />
      </div>

      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🛒 Your Cart</h1>
        <button
          onClick={handleGoHome}
          className="text-gray-500 text-xl hover:text-red-500"
        >
          ❌
        </button>
      </div>

      {/* 장바구니 리스트 */}
      {cartItems.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="bg-white shadow p-4 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                <span className="text-indigo-600 font-semibold">
                  {item.price.toLocaleString()}원
                </span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-6">
            <span className="font-bold text-xl">
              Total: {totalPrice.toLocaleString()}원
            </span>
            +{' '}
            <CommonButton onClick={handleClearCart} variant="purple">
              장바구니 비우기
            </CommonButton>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

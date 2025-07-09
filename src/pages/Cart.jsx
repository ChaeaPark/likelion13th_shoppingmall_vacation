import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../components/CommonButton';
import { cartMock } from '../mock/Cartmock';
import CartIcon from '../assets/Cart.svg';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(
      cartMock.map((item) => ({
        ...item,
        checked: true,
      }))
    );
  }, []);

  const toggleCheck = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const deleteItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleAllCheck = (e) => {
    const checked = e.target.checked;
    setCartItems((prev) =>
      prev.map((item) => ({
        ...item,
        checked,
      }))
    );
  };

  const totalPrice = cartItems
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleGoHome = () => {
    navigate('/main');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-8 flex justify-between gap-10 relative">
      {/* 왼쪽 테이블 */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">장바구니</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <img src={CartIcon} alt="장바구니 아이콘" className="w-8 h-8" />
            </div>
            <p className="text-gray-700 mb-2">장바구니가 비었습니다.</p>
            <button
              className="text-sm text-purple-600 hover:underline"
              onClick={handleGoHome}
            >
              쇼핑하러 가기
            </button>
          </div>
        ) : (
          <>
            {cartItems.length > 0 && (
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-purple-500 mr-2"
                  onChange={toggleAllCheck}
                  checked={cartItems.every((item) => item.checked)}
                />
                <label className="text-gray-700">전체 선택</label>
              </div>
            )}

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow p-4 rounded flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleCheck(item.id)}
                    className="w-4 h-4 accent-purple-500"
                  />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded"
                  />
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-800 whitespace-nowrap">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      담은 수량: {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center pt-5">
                  <div className="text-indigo-600 font-semibold text-base whitespace-nowrap">
                    {(item.price * item.quantity).toLocaleString()}원
                  </div>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-gray-400 hover:text-red-500 text-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-end mt-6">
              <CommonButton onClick={() => setCartItems([])} variant="purple">
                장바구니 비우기
              </CommonButton>
            </div>
          </>
        )}
      </div>

      {/* 오른쪽 결제 박스 */}
      <div className="w-full max-w-xs bg-white p-6 rounded-lg shadow-md self-start">
        <h2 className="text-right text-sm text-gray-500 mb-4">Show Items</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>총 주문 금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span>할인 금액</span>
            <span>0원</span>
          </div>
          <div className="flex justify-between">
            <span>배송비</span>
            <span>0원</span>
          </div>
        </div>
        <div className="flex justify-between font-bold text-black mt-6 mb-4 text-base">
          <span>총 결제 금액</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </div>
        <CommonButton variant="purple" className="w-full">
          결제하기
        </CommonButton>
      </div>
    </div>
  );
};

export default Cart;

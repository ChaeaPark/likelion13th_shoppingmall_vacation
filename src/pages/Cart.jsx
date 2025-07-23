import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonButton from '../components/CommonButton';
import { getCartItems, removeFromCart } from '../apis/cart';
import CartIcon from '../assets/Cart.svg';
import img9 from '../assets/image9.png';
import { useAuthStore } from '../stores/useAuthStore'; // ✅ 추가

const Cart = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // ✅ 로그인 확인

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ 로그인 여부 확인 후 미로그인 시 차단
  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인 후 이용 가능한 페이지입니다.');
      navigate('/');
      return;
    }
  }, [isLoggedIn, navigate]);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCartItems(); // ✅ userEmail 제거

      let fetchedCartItems = [];
      if (data && data.data && Array.isArray(data.data.cartItems)) {
        fetchedCartItems = data.data.cartItems;
      } else if (data && Array.isArray(data.cartItems)) {
        fetchedCartItems = data.cartItems;
      } else {
        console.warn('cartItems 배열을 찾을 수 없습니다:', data);
        fetchedCartItems = [];
      }

      const itemsWithCheckedState = fetchedCartItems.map((item, index) => ({
        ...item,
        checked: true,
        _uniqueKey: item.cartItemId
          ? item.id
          : `temp-cart-item-${index}-${Date.now()}-${Math.random()}`,
      }));
      setCartItems(itemsWithCheckedState);
    } catch (err) {
      console.error('장바구니 데이터를 불러오는 데 실패했습니다:', err);
      setError('장바구니를 불러오지 못했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchCart();
  }, [isLoggedIn]);

  const toggleCheck = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const deleteItem = async (id, itemName) => {
    if (window.confirm(`${itemName}을(를) 장바구니에서 삭제하시겠습니까?`)) {
      setLoading(true);
      setError(null);
      try {
        await removeFromCart(id); // ✅ userEmail 제거
        await fetchCart();
        alert(`${itemName}이(가) 장바구니에서 삭제되었습니다.`);
      } catch (err) {
        console.error('장바구니 아이템 삭제 실패:', err);
        setError('아이템 삭제에 실패했습니다. 다시 시도해주세요.');
        alert('아이템 삭제에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
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

  const handleClearCart = async () => {
    if (window.confirm('정말 장바구니를 비우시겠습니까?')) {
      setLoading(true);
      setError(null);
      try {
        for (const item of cartItems) {
          await removeFromCart(item.cartItemId); // ✅ userEmail 제거
        }
        setCartItems([]);
        alert('장바구니가 비워졌습니다.');
      } catch (error) {
        console.error('장바구니 비우기 실패:', error);
        setError('장바구니를 비우는 데 실패했습니다. 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    }
  };

  const totalPrice = cartItems
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleGoHome = () => {
    navigate('/main');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100">
        <p className="text-xl text-gray-700">장바구니를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100 flex-col">
        <p className="text-xl text-red-500 mb-4">{error}</p>
        <CommonButton variant="default" onClick={fetchCart}>
          다시 시도
        </CommonButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-8 flex justify-between gap-10 relative">
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
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                className="w-4 h-4 accent-purple-500 mr-2"
                onChange={toggleAllCheck}
                checked={cartItems.every((item) => item.checked)}
              />
              <label className="text-gray-700">전체 선택</label>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-white shadow p-4 rounded flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 mb-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleCheck(item.cartItemId)}
                    className="w-4 h-4 accent-purple-500"
                  />
                  <img
                    src={item.imageUrl || img9}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded"
                  />
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-800 whitespace-nowrap">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      카테고리: {item.product.content || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-500">
                      담은 수량: {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center pt-5">
                  <div className="text-indigo-600 font-semibold text-base whitespace-nowrap">
                    {(item.product.price * item.quantity).toLocaleString()}원
                  </div>
                  <button
                    onClick={() => deleteItem(item.cartItemId, item.name)}
                    className="text-gray-400 hover:text-red-500 text-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-end mt-6">
              <CommonButton onClick={handleClearCart} variant="purple">
                장바구니 비우기
              </CommonButton>
            </div>
          </>
        )}
      </div>

      <div className="w-full max-w-xs bg-white p-6 rounded-lg shadow-md self-start sticky top-8">
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

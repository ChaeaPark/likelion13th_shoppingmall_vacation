import instance from './axios';

const CART_API_BASE_URL = '/api/v1/cart';
const CART_API_BASE_URL_add = '/api/v1/cart/items';

// 장바구니 아이템 전체 조회 (이메일 파라미터 제거됨)
export const getCartItems = async () => {
  try {
    const res = await instance.get(CART_API_BASE_URL);
    console.log('[getCartItems] 장바구니 조회 API 호출 성공:', res.data);
    return res.data;
  } catch (error) {
    console.error('장바구니 아이템을 불러오는 데 실패했습니다:', error);
    throw error;
  }
};

// 장바구니에 아이템 추가 (snake_case 적용)
export const addToCart = async (itemToAdd) => {
  console.log('addToCart 함수 실행 시작');
  console.log('itemToAdd 데이터:', itemToAdd);
  try {
    const res = await instance.post(CART_API_BASE_URL_add, itemToAdd);
    console.log('장바구니 추가 API 호출 성공:', res.data);
    return res.data;
  } catch (error) {
    console.error('장바구니에 아이템을 추가하는 데 실패했습니다:', error);
    throw error;
  }
};

// 장바구니에서 아이템 제거 (이메일 파라미터 제거됨)
export const removeFromCart = async (cartItemId) => {
  try {
    const res = await instance.delete(`${CART_API_BASE_URL_add}/${cartItemId}`);
    return res.data;
  } catch (error) {
    console.error(
      `장바구니 아이템 (ID: ${cartItemId}) 제거에 실패했습니다:`,
      error
    );
    throw error;
  }
};

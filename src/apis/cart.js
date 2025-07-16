import instance from './axios';

const CART_API_BASE_URL = '/api/v1/cart';
const CART_API_BASE_URL_add = '/api/v1/cart/items';

export const getCartItems = async (userEmail) => {
  try {
    const res = await instance.get(CART_API_BASE_URL, {
      params: {
        email: userEmail,
      },
    });
    console.log('[addToCart] 장바구니 추가 API 호출 성공:', res.data);

    return res.data;
  } catch (error) {
    console.error('장바구니 아이템을 불러오는 데 실패했습니다:', error);
    throw error;
  }
};

export const addToCart = async (itemToAdd) => {
  console.log('addToCart 함수 실행 시작');
  console.log('itemToAdd 데이터:', itemToAdd);
  try {
    const res = await instance.post(CART_API_BASE_URL_add, itemToAdd, {
      params: {
        email: itemToAdd.userEmail,
      },
    });
    console.log('장바구니 추가 API 호출 성공:', res.data);
    return res.data;
  } catch (error) {
    console.error('장바구니에 아이템을 추가하는 데 실패했습니다:', error);
    throw error;
  }
};

export const removeFromCart = async (cartItemId, userEmail) => {
  try {
    const res = await instance.delete(
      `${CART_API_BASE_URL_add}/${cartItemId}`,
      {
        params: {
          email: userEmail,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(
      `장바구니 아이템 (ID: ${cartItemId}) 제거에 실패했습니다:`,
      error
    );
    throw error;
  }
};

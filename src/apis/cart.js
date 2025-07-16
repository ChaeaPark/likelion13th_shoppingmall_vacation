import axiosInstance from './axios';

// 장바구니 API 엔드포인트 경로 (명세에 따라 '/cart'로 설정)
const CART_API_BASE_URL = '/cart';

export const getCartItems = async () => {
  try {
    const res = await axiosInstance.get(CART_API_BASE_URL); // response -> res
    // 명세에 따르면 res.data 자체가 필요한 구조를 가지고 있습니다.
    return res.data;
  } catch (error) {
    console.error('장바구니 아이템을 불러오는 데 실패했습니다:', error);
    throw error; // 에러를 호출자에게 다시 던져 처리할 수 있도록 합니다.
  }
};

export const addToCart = async (itemToAdd) => {
  try {
    const res = await axiosInstance.post(CART_API_BASE_URL, itemToAdd); // response -> res
    return res.data;
  } catch (error) {
    console.error('장바구니에 아이템을 추가하는 데 실패했습니다:', error);
    throw error;
  }
};

export const removeFromCart = async (cartItemId) => {
  try {
    // 명세에 따라 DELETE 요청은 /cart/{id} 형태의 URL을 사용합니다.
    const res = await axiosInstance.delete(
      `${CART_API_BASE_URL}/${cartItemId}`
    ); // response -> res
    return res.data;
  } catch (error) {
    console.error(
      `장바구니 아이템 (ID: ${cartItemId}) 제거에 실패했습니다:`,
      error
    );
    throw error;
  }
};

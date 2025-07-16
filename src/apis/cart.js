import axiosInstance from './axios';

const CART_API_BASE_URL = '/cart';

export const getCartItems = async () => {
  try {
    const res = await axiosInstance.get(CART_API_BASE_URL);
    return res.data;
  } catch (error) {
    console.error('장바구니 아이템을 불러오는 데 실패했습니다:', error);
    throw error;
  }
};

export const addToCart = async (itemToAdd) => {
  try {
    const res = await axiosInstance.post(CART_API_BASE_URL, itemToAdd);
  } catch (error) {
    console.error('장바구니에 아이템을 추가하는 데 실패했습니다:', error);
    throw error;
  }
};

export const removeFromCart = async (cartItemId) => {
  try {
    const res = await axiosInstance.delete(
      `${CART_API_BASE_URL}/${cartItemId}`
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

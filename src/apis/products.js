import axios from 'axios';

export const getAllProducts = async () => {
  try {
    const response = await axios.get('/products');
    return response.data.products;
  } catch (error) {
    console.error('상품 전체 조회 실패:', error);
    throw error;
  }
};

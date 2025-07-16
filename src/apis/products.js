import instance from './axios';

export const getAllProducts = async () => {
  try {
    const response = await instance.get('/api/v1/products');
    return response.data.products;
  } catch (error) {
    console.error('상품 전체 조회 실패:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  const response = await instance.get(`/products/${id}`);

  return response.data;
};

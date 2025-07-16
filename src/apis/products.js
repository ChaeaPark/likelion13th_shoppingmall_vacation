import axiosInstance from 'axios';

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/products');
    return response.data.products;
  } catch (error) {
    console.error('상품 전체 조회 실패:', error);
    return [];
  }
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

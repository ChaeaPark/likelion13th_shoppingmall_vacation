import instance from './axios';

export const getAllProducts = async () => {
  try {
    // instance를 사용하여 상대 경로로 요청합니다.
    const response = await instance.get('/api/v1/products');
    console.log('상품 전체 조회 성공:', response.data);

    return response.data.products;
  } catch (error) {
    console.error('상품 전체 조회 실패:', error);
    return [];
  }
};

export const getProductById = async (id) => {
  const response = await isntance.get(`/products/${id}`);

  return response.data;
};

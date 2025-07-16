import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommonButton from '../components/CommonButton';
import img9 from '../assets/image9.png';
import instance from '../apis/axios';
import { addToCart } from '../apis/cart';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const userEmail = 'user@example.com';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await instance.get(`/api/v1/products/${id}`);
        setProduct(res.data.data);
        console.log(
          '⭐ Detail 페이지: 상품 데이터 성공적으로 로드됨:',
          res.data.data
        );
      } catch (err) {
        setError('해당 상품을 불러올 수 없습니다.');
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    console.log('handleAddToCart 함수 호출됨!');
    console.log('현재 product 상태 (handleAddToCart 내부):', product);
    if (!product) {
      console.log(
        '상품 정보가 아직 로드되지 않았거나 유효하지 않습니다. addToCart 호출 불가.'
      );
      return;
    }
    try {
      const itemToAddToCart = {
        productId: product.id,
        quantity: count,
        userEmail: userEmail,
      };
      console.log(
        '[Detail] 장바구니에 보낼 데이터 (addToCart 호출 직전):',
        itemToAddToCart
      );
      await addToCart(itemToAddToCart);
      setShowModal(true);
    } catch (err) {
      console.error('장바구니 추가 실패:', err);
      setError('상품 추가에 실패했습니다. 다시 시도해주세요.');
      alert('상품 추가에 실패했습니다.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      navigate('/main');
    }, 100);
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product)
    return (
      <p className="text-center text-gray-600">
        상품 정보를 불러오는 중입니다...
      </p>
    );

  return (
    <div className="relative bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen flex justify-center px-4 py-20">
      {/* 배경 효과 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-purple-300 opacity-30 rounded-full blur-3xl top-[-100px] left-[-100px]" />
        <div className="absolute w-[300px] h-[300px] bg-indigo-300 opacity-30 rounded-full blur-2xl bottom-[-80px] right-[-60px]" />
      </div>

      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl p-8 flex flex-col md:flex-row gap-10 items-center">
        {/* 이미지 영역 */}
        <img
          src={img9}
          alt={product.name}
          className="w-64 h-64 object-contain rounded-md shadow"
        />

        {/* 상세 정보 영역 */}
        <div className="flex-1 space-y-4">
          <p className="text-sm text-gray-500">{product.category}</p>

          {/* 상품명 + 가격 */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {product.name}
            </h1>
            <p className="text-lg font-semibold text-indigo-700 whitespace-nowrap">
              가격: {product.price.toLocaleString()}원
            </p>
          </div>

          <p className="text-base text-gray-700">{product.description}</p>

          {/* 수량 선택 */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm font-medium">구매 수량</span>
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
            >
              -
            </button>
            <span className="w-8 text-center">{count}</span>
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setCount((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          {/* 총합 */}
          <p className="text-base text-gray-800">
            총 상품 금액: {(product.price * count).toLocaleString()}원
          </p>

          {/* 장바구니 버튼 */}
          <div className="pt-4">
            <CommonButton variant="main" onClick={handleAddToCart}>
              장바구니
            </CommonButton>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-[300px] text-center space-y-6">
            <p className="text-lg font-semibold text-gray-800">
              장바구니에 추가되었습니다.
            </p>
            <div className="flex justify-center gap-4">
              <CommonButton variant="default" onClick={handleCloseModal}>
                쇼핑 계속하기
              </CommonButton>
              <CommonButton variant="purple" onClick={handleGoToCart}>
                장바구니 보기
              </CommonButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;

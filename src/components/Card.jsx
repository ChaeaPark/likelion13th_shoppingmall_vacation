import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import CommonButton from './CommonButton';
import img9 from '../assets/Image9.png';

export default function Card({ name, category, price, imageUrl, onAddToCart }) {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    onAddToCart();
    navigate('/cart');
  };

  return (
    <div className="bg-white rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-purple-300 overflow-hidden w-full border border-gray-200">
      <img
        src={img9}
        alt={name}
        className="w-25 h-25 object-cover items-center mx-auto p-4 md:p-6"
      />
      <div className="p-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{category}</p>
        <div className="mt-2 text-right text-indigo-600 font-semibold text-base md:text-lg">
          {price.toLocaleString()}원
        </div>
        <CommonButton onClick={handleAddToCart} variant="main">
          Add to Cart
        </CommonButton>
      </div>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string,
  price: PropTypes.number.isRequired,
  imageUrl: { img9 },
  onAddToCart: PropTypes.func.isRequired,
};

Card.defaultProps = {
  category: '',
};

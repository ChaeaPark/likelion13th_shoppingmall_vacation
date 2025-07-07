import { useState } from 'react';

const CommonButton = ({
  children,
  onClick,
  disabled,
  className = '',
  variant = 'default',
  type = 'button',
}) => {
  const [clicked, setClicked] = useState(false);

  const base = 'font-semibold rounded-md transition';
  const variants = {
    signin:
      'w-full md:w-[120px] py-2 md:py-3 text-sm md:text-base bg-indigo-600 text-white hover:bg-indigo-700',
    main: 'w-full py-2 text-sm bg-purple-500 text-white hover:bg-purple-600',
    purple:
      'px-4 py-2 bg-purple-500 text-white font-semibold rounded hover:bg-purple-600',
    default: 'px-4 py-2 bg-gray-300 text-black',
  };

  const handleClick = (e) => {
    if (onClick) onClick(e);
    setClicked(true);
    setTimeout(() => setClicked(false), 1000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      type={type}
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {clicked && variant === 'main' ? 'Added!' : children}
    </button>
  );
};

export default CommonButton;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import buttonIcon from '../assets/Button.svg';
import signinIcon from '../assets/Signin.svg';
import cartIcon from '../assets/Cart.svg';
import SearchBar from './SearchBar';
import React from 'react'; // Added missing import for React

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('userEmail')
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    navigate('/main');
  };

  // 로그인 상태 변화 감지 (다른 탭/창에서 로그아웃 등)
  // eslint-disable-next-line
  React.useEffect(() => {
    const onStorage = () => setIsLoggedIn(!!localStorage.getItem('userEmail'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <>
      {/* 데스크탑 Navbar */}
      <nav className="hidden dt:flex justify-between items-center px-10 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md fixed top-0 left-0 right-0 z-50">
        <Link
          to="/main"
          className="text-2xl font-bold tracking-tight hover:text-yellow-200"
        >
          ShopMall
        </Link>

        <div className="flex-grow flex justify-center">
          {' '}
          <div className="w-full max-w-md">
            {' '}
            <SearchBar />
          </div>
        </div>

        <div className="space-x-6 text-lg flex items-center">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hover:text-yellow-300 transition flex items-center space-x-2 bg-transparent border-none outline-none cursor-pointer"
            >
              <span className="text-white">로그아웃</span>
            </button>
          ) : (
            <Link
              to="/"
              className="hover:text-yellow-300 transition flex items-center space-x-2"
            >
              <img src={signinIcon} alt="Sign In" className="w-6 h-6" />
              <span className="text-white">Sign In</span>
            </Link>
          )}

          <Link
            to="/cart"
            className="hover:text-yellow-300 transition flex items-center space-x-2"
          >
            <img src={cartIcon} alt="Cart" className="w-6 h-6" />
            <span className="text-white">Cart</span>
          </Link>
        </div>
      </nav>

      {/* 모바일 Navbar */}
      <nav className="dt:hidden ph:flex justify-between items-center px-5 h-16 bg-gradient-to-r from-purple-600 to-indigo-700 text-white fixed top-0 left-0 right-0 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          <img src={buttonIcon} alt="메뉴 열기" className="w-8 h-8" />
        </button>
        <Link to="/main" className="text-xl font-semibold tracking-wide">
          ShopMall
        </Link>
      </nav>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <div className="dt:hidden ph:flex flex-col bg-white text-black shadow-md absolute top-16 left-0 right-0 py-4 px-6 z-40 space-y-3">
          <div className="w-full mb-3">
            <SearchBar />
          </div>
          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="flex items-center space-x-2 bg-transparent border-none outline-none cursor-pointer"
            >
              <span className="text-black">로그아웃</span>
            </button>
          ) : (
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2"
            >
              <img src={signinIcon} alt="Sign In" className="w-6 h-6" />
              <span className="text-black">Sign In</span>
            </Link>
          )}
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-2"
          >
            <img src={cartIcon} alt="Cart" className="w-6 h-6" />
            <span className="text-black">Cart</span>
          </Link>
        </div>
      )}
    </>
  );
}

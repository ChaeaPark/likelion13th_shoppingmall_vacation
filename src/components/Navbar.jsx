import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import buttonIcon from '../assets/Button.svg';
import signinIcon from '../assets/Signin.svg';
import cartIcon from '../assets/Cart.svg';
import SearchBar from './SearchBar';
import React from 'react';
import { useAuthStore } from '../stores/useAuthStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem('userEmail');
    navigate('/main');
  };

  return (
    <>
      {/* 데스크탑 Navbar */}
      <nav className="hidden dt:flex justify-between items-center px-10 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md fixed top-0 left-0 right-0 z-50">
        <span className="text-2xl font-bold tracking-tight text-white">
          ShopMall
        </span>

        <div className="flex-grow flex justify-center">
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>

        <div className="space-x-6 text-lg flex items-center">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hover:text-yellow-300 transition flex items-center space-x-2 bg-transparent border-none outline-none cursor-pointer"
            >
              <img src={signinIcon} alt="Sign In" className="w-6 h-6" />
              <span className="text-white">Log out</span>
            </button>
          ) : (
            <span
              onClick={() => navigate('/')}
              className="hover:text-yellow-300 transition flex items-center space-x-2 cursor-pointer"
            >
              <img src={signinIcon} alt="Sign In" className="w-6 h-6" />
              <span className="text-white">Sign In</span>
            </span>
          )}

          <span
            onClick={() => navigate('/cart')}
            className="hover:text-yellow-300 transition flex items-center space-x-2 cursor-pointer"
          >
            <img src={cartIcon} alt="Cart" className="w-6 h-6" />
            <span className="text-white">Cart</span>
          </span>
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
        <span className="text-xl font-semibold tracking-wide text-white">
          ShopMall
        </span>
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
              <img src={signinIcon} alt="Sign In" className="w-6 h-6" />
              <span className="text-black">Log out</span>
            </button>
          ) : (
            <span
              onClick={() => {
                setIsOpen(false);
                navigate('/');
              }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <img src={signinIcon} alt="Sign In" className="w-6 h-6" />
              <span className="text-black">Sign In</span>
            </span>
          )}
          <span
            onClick={() => {
              setIsOpen(false);
              navigate('/cart');
            }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img src={cartIcon} alt="Cart" className="w-6 h-6" />
            <span className="text-black">Cart</span>
          </span>
        </div>
      )}
    </>
  );
}

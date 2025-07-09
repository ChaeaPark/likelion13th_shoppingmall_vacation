import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import buttonIcon from '../assets/Button.svg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHidden = location.pathname === '/';

  return (
    <>
      {/* 데스크탑 Navbar */}
      <nav className="hidden dt:flex justify-between items-center px-10 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md fixed top-0 left-0 right-0 z-50">
        {!isHidden && (
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
        )}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight hover:text-yellow-200"
        >
          MyShop
        </Link>
        <div className="space-x-6 text-lg">
          <Link to="/" className="hover:text-yellow-300 transition ">
            Sign In
          </Link>
          <Link to="/cart" className="hover:text-yellow-300 transition">
            Cart
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
        <Link to="/" className="text-xl font-semibold tracking-wide">
          MyShop
        </Link>
      </nav>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <div className="dt:hidden ph:flex flex-col bg-white text-black shadow-md absolute top-16 left-0 right-0 py-4 px-6 z-40 space-y-3">
          <Link
            to="/"
            className="hover:text-purple-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/signin"
            className="hover:text-purple-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
          <Link
            to="/cart"
            className="hover:text-purple-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Cart
          </Link>
        </div>
      )}
    </>
  );
}

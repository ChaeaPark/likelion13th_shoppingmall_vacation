import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Searchicon from '../assets/Searchicon.png'; // Assuming you have a search icon

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center w-full">
      <input
        type="text"
        placeholder="상품을 검색하세요..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full py-2 px-4 pr-10 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      />
      <button type="submit" className="absolute right-3 text-gray-500">
        <img src={Searchicon} alt="Search" className="h-5 w-5" />
      </button>
    </form>
  );
}

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../apis/axios';
import Card from '../components/Card';

export default function SearchPage({ addToCart }) {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const searchTerm = searchParams.get('query') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await axiosInstance.get(
          `/products?name=${encodeURIComponent(searchTerm)}`
        );
        setResults(res.data.products);
        setError('');
      } catch (err) {
        console.error(err);
        setError('검색 결과를 불러오지 못했습니다.');
      }
    };

    if (searchTerm) {
      fetchSearchResults();
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-purple-100 to-indigo-100">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          검색 결과: <span className="text-indigo-600">{searchTerm}</span>
        </h1>

        {error && <p className="text-red-500">{error}</p>}
        {results.length === 0 && !error && (
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        )}

        <div className="grid grid-cols-2 dt:grid-cols-4 gap-6 pt-4">
          {results.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              category={item.category}
              price={item.price}
              onAddToCart={() => addToCart(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

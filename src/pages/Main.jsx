import React from 'react';
import clothes from '../data/clothes';
import Card from '../components/Card';

const Main = ({ addToCart }) => {
  return (
    <main className="relative bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen flex justify-center px-4 py-10">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-purple-300 opacity-30 rounded-full blur-3xl top-[-100px] left-[-100px]" />
        <div className="absolute w-[300px] h-[300px] bg-indigo-300 opacity-30 rounded-full blur-2xl bottom-[-80px] right-[-60px]" />
      </div>

      <section className="w-full max-w-[1280px] flex flex-col items-start gap-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">
          Welcome to ShopMall
        </h1>
        <p className="text-base md:text-lg text-gray-700">
          Discover our latest products and deals
        </p>
        <div className="w-full flex flex-col gap-4">
          <div className="text-base md:text-lg tracking-widest text-gray-500">
            Featured Products
          </div>
          <div className="w-full grid grid-cols-2 dt:grid-cols-4 gap-6">
            {clothes.map((item) => (
              <Card
                key={item.id}
                name={item.name}
                category={item.category}
                price={item.price}
                imageUrl={item.imageUrl}
                onAddToCart={() => addToCart(item)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;

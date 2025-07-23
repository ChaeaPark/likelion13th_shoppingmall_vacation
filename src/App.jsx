import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Main from './pages/Main';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Layout from './components/Layout';
import Detail from './pages/Detail';
import SearchPage from './pages/SearchPage';
import KakaoRedirect from './pages/KakaoRedirect';
import './index.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Layout이 없는 단독 라우트 */}
        <Route path="/auth/callback" element={<KakaoRedirect />} />

        {/* Layout이 적용되는 공통 구조 */}
        <Route element={<Layout />}>
          <Route path="/" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/detail/:id"
            element={<Detail addToCart={addToCart} />}
          />
          <Route
            path="/search"
            element={<SearchPage addToCart={addToCart} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

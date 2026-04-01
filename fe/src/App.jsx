import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { useSelector, useDispatch } from 'react-redux';
import { cartAPI } from './api';
import { setCartItems, clearCart } from './store/cartSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage/OrderHistoryPage';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Fetch cart when user logs in, clear when logs out
  useEffect(() => {
    if (isAuthenticated) {
      cartAPI.get()
        .then(res => dispatch(setCartItems(res.data)))
        .catch(() => dispatch(setCartItems([])));
    } else {
      dispatch(clearCart());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <div className="app">
      <Header />
      <main>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

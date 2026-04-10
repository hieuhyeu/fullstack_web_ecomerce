import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { cartAPI } from '../../api';
import { setCartItems, updateCartItem, removeCartItem, setCartLoading } from '../../store/cartSlice';
import './CartPage.css';

export default function CartPage() {
  const { items, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatingId, setUpdatingId] = useState(null);

  const fetchCart = useCallback(() => {
    if (!isAuthenticated) return;
    dispatch(setCartLoading());
    cartAPI.get()
      .then(res => dispatch(setCartItems(res.data)))
      .catch((err) => {
        console.error('Failed to fetch cart:', err);
        dispatch(setCartItems([]));
      });
  }, [isAuthenticated, dispatch]);

  // Fetch cart EVERY time this page mounts
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleUpdateQuantity = async (item, delta) => {
    const newQty = item.quantity + delta;
    if (newQty < 1) return;

    setUpdatingId(item.id);
    try {
      await cartAPI.update(item.id, newQty);
      dispatch(updateCartItem({ id: item.id, quantity: newQty }));
    } catch {
      toast.error('Không thể cập nhật');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (id) => {
    try {
      await cartAPI.remove(id);
      dispatch(removeCartItem(id));
      toast.success('Đã xoá khỏi giỏ hàng');
    } catch {
      toast.error('Không thể xoá');
    }
  };

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!isAuthenticated) {
    return (
      <div className="cart-page page-enter">
        <div className="container cart-empty">
          <FiShoppingBag size={64} className="cart-empty__icon" />
          <h2>VUI LÒNG ĐĂNG NHẬP</h2>
          <p>Bạn cần đăng nhập để xem giỏ hàng</p>
          <Link to="/login" className="btn-primary">ĐĂNG NHẬP</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-enter">
      <div className="container">
        <h1 className="cart-page__title">GIỎ HÀNG CỦA BẠN</h1>

        {loading && items.length === 0 ? (
          <div className="cart-empty">
            <FiShoppingBag size={64} className="cart-empty__icon" style={{ opacity: 0.5 }} />
            <h2>ĐANG TẢI GIỎ HÀNG...</h2>
            <p>Vui lòng đợi trong giây lát...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="cart-empty">
            <FiShoppingBag size={64} className="cart-empty__icon" />
            <h2>GIỎ HÀNG TRỐNG</h2>
            <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
            <Link to="/products" className="btn-primary">TIẾP TỤC MUA SẮM</Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Cart Items */}
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <Link to={`/products/${item.product.id}`} className="cart-item__image-wrapper">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="cart-item__image"
                      onError={(e) => { e.target.src = `https://placehold.co/120x120/1a1a1a/ffffff?text=IMG`; }}
                    />
                  </Link>
                  <div className="cart-item__info">
                    <Link to={`/products/${item.product.id}`} className="cart-item__name">
                      {item.product.name}
                    </Link>
                    <p className="cart-item__category">{item.product.category}</p>
                    <p className="cart-item__color">{item.product.color}</p>
                    <p className="cart-item__price">{formatPrice(item.product.price)}</p>
                  </div>
                  <div className="cart-item__actions">
                    <div className="cart-item__quantity">
                      <button
                        onClick={() => handleUpdateQuantity(item, -1)}
                        disabled={updatingId === item.id || item.quantity <= 1}
                        className="quantity-btn-sm"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="cart-item__qty">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item, 1)}
                        disabled={updatingId === item.id}
                        className="quantity-btn-sm"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>
                    <p className="cart-item__subtotal">{formatPrice(item.product.price * item.quantity)}</p>
                    <button onClick={() => handleRemove(item.id)} className="cart-item__remove">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <h3 className="cart-summary__title">TÓM TẮT ĐƠN HÀNG</h3>
              <div className="cart-summary__row">
                <span>Tạm tính ({items.length} sản phẩm)</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="cart-summary__row">
                <span>Phí vận chuyển</span>
                <span>{total >= 2000000 ? 'Miễn phí' : formatPrice(30000)}</span>
              </div>
              <div className="cart-summary__divider" />
              <div className="cart-summary__row cart-summary__total">
                <span>Tổng cộng</span>
                <span>{formatPrice(total >= 2000000 ? total : total + 30000)}</span>
              </div>
              <button className="btn-primary cart-summary__checkout" onClick={() => navigate('/checkout')}>
                THANH TOÁN
              </button>
              <Link to="/products" className="cart-summary__continue">
                <FiArrowLeft size={14} /> Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

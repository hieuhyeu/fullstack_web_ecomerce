import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiCheck } from 'react-icons/fi';
import { orderAPI } from '../../api';
import { clearCart } from '../../store/cartSlice';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const { items } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ shippingAddress: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = total >= 2000000 ? 0 : 30000;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await orderAPI.create(form);
      setOrderId(res.data.id);
      setSuccess(true);
      dispatch(clearCart());
      toast.success('Đặt hàng thành công!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Đặt hàng thất bại');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (success) {
    return (
      <div className="checkout-page page-enter">
        <div className="container checkout-success">
          <div className="checkout-success__icon">
            <FiCheck size={48} />
          </div>
          <h2 className="checkout-success__title">ĐẶT HÀNG THÀNH CÔNG!</h2>
          <p className="checkout-success__text">
            Đơn hàng #{orderId} đã được xác nhận. Cảm ơn bạn đã mua sắm!
          </p>
          <div className="checkout-success__actions">
            <Link to="/orders" className="btn-primary">XEM ĐƠN HÀNG</Link>
            <Link to="/products" className="btn-secondary">TIẾP TỤC MUA SẮM</Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page page-enter">
      <div className="container">
        <h1 className="checkout-page__title">THANH TOÁN</h1>

        <div className="checkout-layout">
          {/* Form */}
          <div className="checkout-form-wrapper">
            <h3 className="checkout-section-title">THÔNG TIN GIAO HÀNG</h3>
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label>HỌ VÀ TÊN</label>
                <input type="text" className="input-field" value={user?.fullName || ''} disabled />
              </div>
              <div className="form-group">
                <label>EMAIL</label>
                <input type="email" className="input-field" value={user?.email || ''} disabled />
              </div>
              <div className="form-group">
                <label htmlFor="phone">SỐ ĐIỆN THOẠI *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="input-field"
                  placeholder="0912 345 678"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="shippingAddress">ĐỊA CHỈ GIAO HÀNG *</label>
                <textarea
                  id="shippingAddress"
                  name="shippingAddress"
                  className="input-field checkout-textarea"
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  value={form.shippingAddress}
                  onChange={handleChange}
                  required
                  rows={3}
                />
              </div>

              <button type="submit" className="btn-primary checkout-submit" disabled={loading}>
                {loading ? 'ĐANG XỬ LÝ...' : `ĐẶT HÀNG — ${formatPrice(total + shipping)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="checkout-summary">
            <h3 className="checkout-section-title">ĐƠN HÀNG CỦA BẠN</h3>
            <div className="checkout-items">
              {items.map(item => (
                <div key={item.id} className="checkout-item">
                  <div className="checkout-item__image-wrapper">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="checkout-item__image"
                      onError={(e) => { e.target.src = 'https://placehold.co/80x80/1a1a1a/ffffff?text=IMG'; }}
                    />
                    <span className="checkout-item__qty-badge">{item.quantity}</span>
                  </div>
                  <div className="checkout-item__info">
                    <p className="checkout-item__name">{item.product.name}</p>
                    <p className="checkout-item__color">{item.product.color}</p>
                  </div>
                  <p className="checkout-item__price">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="checkout-summary__divider" />
            <div className="checkout-summary__row">
              <span>Tạm tính</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="checkout-summary__row">
              <span>Phí vận chuyển</span>
              <span>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
            </div>
            <div className="checkout-summary__divider" />
            <div className="checkout-summary__row checkout-summary__total">
              <span>Tổng cộng</span>
              <span>{formatPrice(total + shipping)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

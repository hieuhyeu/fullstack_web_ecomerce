import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FiPackage, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { orderAPI } from '../../api';
import './OrderHistoryPage.css';

export default function OrderHistoryPage() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    orderAPI.getAll()
      .then(res => setOrders(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated, navigate]);

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusMap = {
    PENDING: { label: 'Chờ xử lý', color: '#f59e0b' },
    CONFIRMED: { label: 'Đã xác nhận', color: '#10b981' },
    SHIPPED: { label: 'Đang giao', color: '#3b82f6' },
    DELIVERED: { label: 'Đã giao', color: '#059669' },
    CANCELLED: { label: 'Đã huỷ', color: '#ef4444' },
  };

  return (
    <div className="orders-page page-enter">
      <div className="container">
        <h1 className="orders-page__title">ĐƠN HÀNG CỦA TÔI</h1>

        {loading ? (
          <div className="orders-loading">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 120, marginBottom: 16 }} />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="orders-empty">
            <FiPackage size={64} className="orders-empty__icon" />
            <h2>CHƯA CÓ ĐƠN HÀNG</h2>
            <p>Bạn chưa đặt đơn hàng nào</p>
            <Link to="/products" className="btn-primary">MUA SẮM NGAY</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => {
              const status = statusMap[order.status] || statusMap.PENDING;
              const isExpanded = expandedId === order.id;

              return (
                <div key={order.id} className="order-card">
                  <div className="order-card__header" onClick={() => setExpandedId(isExpanded ? null : order.id)}>
                    <div className="order-card__left">
                      <div className="order-card__id">
                        <span className="order-card__label">Đơn hàng</span>
                        <span className="order-card__number">#{order.id}</span>
                      </div>
                      <span className="order-card__date">{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="order-card__right">
                      <span className="order-card__status" style={{ color: status.color, borderColor: status.color }}>
                        {status.label}
                      </span>
                      <span className="order-card__total">{formatPrice(order.totalAmount)}</span>
                      {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="order-card__details">
                      <div className="order-card__shipping">
                        <p><strong>Địa chỉ:</strong> {order.shippingAddress}</p>
                        <p><strong>SĐT:</strong> {order.phone}</p>
                      </div>
                      <div className="order-card__items">
                        {order.orderItems?.map(item => (
                          <div key={item.id} className="order-item">
                            <img
                              src={item.product?.imageUrl}
                              alt={item.product?.name}
                              className="order-item__image"
                              onError={(e) => { e.target.src = 'https://placehold.co/60x60/1a1a1a/ffffff?text=IMG'; }}
                            />
                            <div className="order-item__info">
                              <p className="order-item__name">{item.product?.name}</p>
                              <p className="order-item__qty">SL: {item.quantity} × {formatPrice(item.price)}</p>
                            </div>
                            <p className="order-item__subtotal">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

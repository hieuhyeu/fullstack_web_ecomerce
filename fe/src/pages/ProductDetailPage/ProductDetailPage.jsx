import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FiShoppingBag, FiHeart, FiTruck, FiRefreshCw } from 'react-icons/fi';
import { productAPI, cartAPI } from '../../api';
import { addCartItem } from '../../store/cartSlice';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    productAPI.getById(id)
      .then(res => setProduct(res.data))
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info('Vui lòng đăng nhập để thêm giỏ hàng');
      navigate('/login');
      return;
    }

    setAdding(true);
    try {
      const res = await cartAPI.add({ productId: product.id, quantity });
      dispatch(addCartItem(res.data));
      toast.success('Đã thêm vào giỏ hàng!');
    } catch (err) {
      toast.error('Không thể thêm vào giỏ hàng');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="product-detail page-enter">
        <div className="container product-detail__grid">
          <div className="skeleton" style={{ aspectRatio: '1', width: '100%' }} />
          <div>
            <div className="skeleton" style={{ height: 20, width: '40%', marginBottom: 16 }} />
            <div className="skeleton" style={{ height: 40, width: '80%', marginBottom: 16 }} />
            <div className="skeleton" style={{ height: 24, width: '30%', marginBottom: 32 }} />
            <div className="skeleton" style={{ height: 100, width: '100%' }} />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="product-detail page-enter">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')} style={{cursor:'pointer'}}>Trang chủ</span>
          <span className="breadcrumb__sep">/</span>
          <span onClick={() => navigate('/products')} style={{cursor:'pointer'}}>Sản phẩm</span>
          <span className="breadcrumb__sep">/</span>
          <span className="breadcrumb__current">{product.name}</span>
        </div>

        <div className="product-detail__grid">
          {/* Image */}
          <div className="product-detail__image-wrapper">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-detail__image"
              onError={(e) => {
                e.target.src = `https://placehold.co/600x600/1a1a1a/ffffff?text=${encodeURIComponent(product.name)}`;
              }}
            />
          </div>

          {/* Info */}
          <div className="product-detail__info">
            <span className="product-detail__category">{product.category}</span>
            <h1 className="product-detail__name">{product.name}</h1>
            <p className="product-detail__price">{formatPrice(product.price)}</p>

            <div className="product-detail__color">
              <span className="product-detail__label">Màu sắc:</span>
              <span>{product.color}</span>
            </div>

            <div className="product-detail__description">
              <p>{product.description}</p>
            </div>

            {/* Quantity */}
            <div className="product-detail__quantity">
              <span className="product-detail__label">Số lượng:</span>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="quantity-btn">−</button>
                <span className="quantity-value">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="quantity-btn">+</button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              className="btn-primary product-detail__add-btn"
              onClick={handleAddToCart}
              disabled={adding}
            >
              <FiShoppingBag size={18} />
              {adding ? 'ĐANG THÊM...' : 'THÊM VÀO GIỎ HÀNG'}
            </button>

            <button className="btn-secondary product-detail__wishlist-btn">
              <FiHeart size={18} />
              YÊU THÍCH
            </button>

            {/* Features */}
            <div className="product-detail__features">
              <div className="product-detail__feature">
                <FiTruck size={18} />
                <span>Miễn phí vận chuyển cho đơn từ 2.000.000đ</span>
              </div>
              <div className="product-detail__feature">
                <FiRefreshCw size={18} />
                <span>Đổi trả miễn phí trong 30 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

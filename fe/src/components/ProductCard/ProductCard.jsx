import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-card__image-wrapper">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x400/1a1a1a/ffffff?text=${encodeURIComponent(product.name)}`;
          }}
        />
        <div className="product-card__overlay">
          <span className="product-card__quick-view">XEM NHANH</span>
        </div>
        {product.stock < 30 && (
          <span className="product-card__badge">SẮP HẾT</span>
        )}
      </div>
      <div className="product-card__info">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__color">{product.color}</p>
        <p className="product-card__price">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

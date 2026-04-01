import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../../api';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductListPage.css';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  const categories = ['Running', 'Originals', 'Football', 'Outdoor', 'Slides'];

  useEffect(() => {
    setLoading(true);
    let promise;
    if (search) {
      promise = productAPI.search(search);
    } else if (category) {
      promise = productAPI.getAll(category);
    } else {
      promise = productAPI.getAll();
    }

    promise
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [category, search]);

  const handleCategoryClick = (cat) => {
    if (cat === category) {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="product-list-page page-enter">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>Trang chủ</span>
          <span className="breadcrumb__sep">/</span>
          <span className="breadcrumb__current">
            {search ? `Tìm kiếm: "${search}"` : category || 'Tất Cả Sản Phẩm'}
          </span>
        </div>

        {/* Title */}
        <h1 className="product-list__title">
          {search ? `KẾT QUẢ TÌM KIẾM` : category?.toUpperCase() || 'TẤT CẢ SẢN PHẨM'}
        </h1>

        {/* Filters */}
        <div className="product-list__filters">
          <button
            className={`filter-btn ${!category && !search ? 'filter-btn--active' : ''}`}
            onClick={() => setSearchParams({})}
          >
            Tất cả
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${category === cat ? 'filter-btn--active' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="product-list__count">{products.length} sản phẩm</p>

        {/* Product Grid */}
        {loading ? (
          <div className="product-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton" style={{ aspectRatio: '1', width: '100%' }} />
                <div className="skeleton" style={{ height: 14, width: '60%', marginTop: 12 }} />
                <div className="skeleton" style={{ height: 16, width: '80%', marginTop: 8 }} />
                <div className="skeleton" style={{ height: 16, width: '40%', marginTop: 8 }} />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="product-list__empty">
            <h3>Không tìm thấy sản phẩm</h3>
            <p>Vui lòng thử lại với từ khóa hoặc bộ lọc khác.</p>
          </div>
        )}
      </div>
    </div>
  );
}

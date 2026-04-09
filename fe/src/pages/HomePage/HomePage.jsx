import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../../api';
import ProductCard from '../../components/ProductCard/ProductCard';
import './HomePage.css';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getAll()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const featured = products.slice(0, 8);
  const newArrivals = products.slice(8, 12);

  return (
    <div className="home page-enter">
      {/* Hero Banner */}
      <section className="hero">
        <div className="hero__bg">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="hero__video"
            poster="https://brand.assets.adidas.com/video/upload/f_auto,q_auto/if_w_gt_1920,w_1920/global_wc26_home_jerseys_football_fw25_launch_multifed_banner_hero_9_final_d_63c997f79f.jpg"
          >
            <source src="https://brand.assets.adidas.com/video/upload/f_auto,q_auto/if_w_gt_1920,w_1920/global_wc26_home_jerseys_football_fw25_launch_multifed_banner_hero_9_final_d_63c997f79f.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero__content container">
          <span className="hero__tag">BỘ SƯU TẬP MỚI</span>
          <h1 className="hero__title">IMPOSSIBLE<br />IS NOTHING</h1>
          <p className="hero__subtitle">Khám phá bộ sưu tập giày thể thao mới nhất với công nghệ tiên tiến</p>
          <div className="hero__actions">
            <Link to="/products" className="btn-primary">MUA NGAY</Link>
            <Link to="/products?category=Originals" className="btn-secondary" style={{background:'transparent', color:'white', borderColor:'white'}}>
              ORIGINALS
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories container">
        <h2 className="section-title">DANH MỤC</h2>
        <div className="categories__grid">
          {[
            { name: 'RUNNING', image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=RUNNING', link: '/products?category=Running' },
            { name: 'ORIGINALS', image: 'https://placehold.co/600x400/2d2d2d/ffffff?text=ORIGINALS', link: '/products?category=Originals' },
            { name: 'FOOTBALL', image: 'https://placehold.co/600x400/3d3d3d/ffffff?text=FOOTBALL', link: '/products?category=Football' },
          ].map(cat => (
            <Link to={cat.link} key={cat.name} className="categories__item">
              <img src={cat.image} alt={cat.name} className="categories__image" />
              <div className="categories__overlay">
                <h3 className="categories__name">{cat.name}</h3>
                <span className="categories__cta">KHÁM PHÁ →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured container">
        <div className="featured__header">
          <h2 className="section-title">SẢN PHẨM NỔI BẬT</h2>
          <Link to="/products" className="featured__view-all">Xem tất cả →</Link>
        </div>
        {loading ? (
          <div className="product-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton" style={{ aspectRatio: '1', width: '100%' }} />
                <div className="skeleton" style={{ height: 14, width: '60%', marginTop: 12 }} />
                <div className="skeleton" style={{ height: 16, width: '80%', marginTop: 8 }} />
                <div className="skeleton" style={{ height: 16, width: '40%', marginTop: 8 }} />
              </div>
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Banner CTA */}
      <section className="banner-cta">
        <div className="banner-cta__inner container">
          <div className="banner-cta__content">
            <span className="banner-cta__tag">ADIDAS ORIGINALS</span>
            <h2 className="banner-cta__title">PHONG CÁCH<br />KHÔNG GIỚI HẠN</h2>
            <p className="banner-cta__text">Thể hiện cá tính với dòng giày Originals huyền thoại</p>
            <Link to="/products?category=Originals" className="btn-primary" style={{background:'white', color:'black', borderColor:'white'}}>
              KHÁM PHÁ
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="new-arrivals container">
          <h2 className="section-title">HÀNG MỚI VỀ</h2>
          <div className="product-grid">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      <section className="features container">
        <div className="features__grid">
          <div className="features__item">
            <div className="features__icon">🚚</div>
            <h4 className="features__title">MIỄN PHÍ VẬN CHUYỂN</h4>
            <p className="features__text">Cho đơn hàng từ 2.000.000đ</p>
          </div>
          <div className="features__item">
            <div className="features__icon">↩️</div>
            <h4 className="features__title">ĐỔI TRẢ 30 NGÀY</h4>
            <p className="features__text">Đổi trả miễn phí trong 30 ngày</p>
          </div>
          <div className="features__item">
            <div className="features__icon">✓</div>
            <h4 className="features__title">CHÍNH HÃNG 100%</h4>
            <p className="features__text">Cam kết sản phẩm chính hãng</p>
          </div>
          <div className="features__item">
            <div className="features__icon">💬</div>
            <h4 className="features__title">HỖ TRỢ 24/7</h4>
            <p className="features__text">Tư vấn mọi lúc mọi nơi</p>
          </div>
        </div>
      </section>
    </div>
  );
}

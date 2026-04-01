import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Column 1 */}
          <div className="footer__col">
            <h4 className="footer__heading">SẢN PHẨM</h4>
            <ul className="footer__links">
              <li><Link to="/products?category=Running">Giày Chạy Bộ</Link></li>
              <li><Link to="/products?category=Originals">Originals</Link></li>
              <li><Link to="/products?category=Football">Bóng Đá</Link></li>
              <li><Link to="/products?category=Outdoor">Outdoor</Link></li>
              <li><Link to="/products?category=Slides">Dép</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="footer__col">
            <h4 className="footer__heading">HỖ TRỢ</h4>
            <ul className="footer__links">
              <li><a href="#">Trung Tâm Trợ Giúp</a></li>
              <li><a href="#">Theo Dõi Đơn Hàng</a></li>
              <li><a href="#">Đổi/Trả Hàng</a></li>
              <li><a href="#">Liên Hệ</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer__col">
            <h4 className="footer__heading">CÔNG TY</h4>
            <ul className="footer__links">
              <li><a href="#">Về Chúng Tôi</a></li>
              <li><a href="#">Tuyển Dụng</a></li>
              <li><a href="#">Báo Chí</a></li>
              <li><a href="#">Bền Vững</a></li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="footer__col footer__col--newsletter">
            <h4 className="footer__heading">ĐĂNG KÝ NHẬN TIN</h4>
            <p className="footer__newsletter-text">
              Nhận thông tin về sản phẩm mới và khuyến mãi.
            </p>
            <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email của bạn" className="footer__newsletter-input" />
              <button type="submit" className="footer__newsletter-btn">→</button>
            </form>
          </div>
        </div>

        {/* Social & Bottom */}
        <div className="footer__bottom">
          <div className="footer__social">
            <a href="#" className="footer__social-link" aria-label="Instagram"><FiInstagram size={20} /></a>
            <a href="#" className="footer__social-link" aria-label="Facebook"><FiFacebook size={20} /></a>
            <a href="#" className="footer__social-link" aria-label="Twitter"><FiTwitter size={20} /></a>
            <a href="#" className="footer__social-link" aria-label="YouTube"><FiYoutube size={20} /></a>
          </div>
          <div className="footer__copyright">
            <p>© 2024 adidas clone. Demo project for DevOps internship.</p>
            <div className="footer__legal">
              <a href="#">Chính Sách Bảo Mật</a>
              <a href="#">Điều Khoản Sử Dụng</a>
              <a href="#">Cookie</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

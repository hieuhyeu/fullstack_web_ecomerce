import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiSearch, FiShoppingBag, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { logout } from '../../store/authSlice';
import { clearCart } from '../../store/cartSlice';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    setUserMenuOpen(false);
    navigate('/login');
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      Top Banner
      <div className="top-banner">
        <div className="container">
          <p className="top-banner-text">MIỄN PHÍ VẬN CHUYỂN CHO ĐƠN HÀNG TỪ 2.000.000đ</p>
        </div>
      </div>

      {/* Main Header */}
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="container header__inner">
          {/* Mobile Menu Toggle */}
          <button className="header__mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="header__logo">
            <svg viewBox="0 0 40 26" fill="currentColor" width="40" height="26">
              <path d="M19.8 25.2L0 10.8l5.1-3.3L19.8 19l14.7-11.5L39.6 10.8z" />
              <path d="M19.8 18L7.2 8.3l5.1-3.3L19.8 12l7.5-7L32.4 8.3z" />
              <path d="M19.8 10.8L14.4 6l5.4-4.2L25.2 6z" />
            </svg>
          </Link>

          {/* Navigation */}
          <nav className={`header__nav ${mobileMenuOpen ? 'header__nav--open' : ''}`}>
            <Link to="/products?category=Running" className="header__nav-link" onClick={() => setMobileMenuOpen(false)}>
              RUNNING
            </Link>
            <Link to="/products?category=Originals" className="header__nav-link" onClick={() => setMobileMenuOpen(false)}>
              ORIGINALS
            </Link>
            <Link to="/products?category=Football" className="header__nav-link" onClick={() => setMobileMenuOpen(false)}>
              FOOTBALL
            </Link>
            <Link to="/products" className="header__nav-link" onClick={() => setMobileMenuOpen(false)}>
              TẤT CẢ
            </Link>
            <Link to="/products?category=Slides" className="header__nav-link header__nav-link--sale" onClick={() => setMobileMenuOpen(false)}>
              SALE
            </Link>
          </nav>

          {/* Actions */}
          <div className="header__actions">
            {/* Search */}
            <div className={`header__search ${searchOpen ? 'header__search--open' : ''}`}>
              <form onSubmit={handleSearch} className="header__search-form">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="header__search-input"
                  autoFocus={searchOpen}
                />
              </form>
            </div>
            <button className="header__action-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Tìm kiếm">
              <FiSearch size={20} />
            </button>

            {/* User */}
            {isAuthenticated ? (
              <div className="header__user-menu-wrapper">
                <button className="header__action-btn" onClick={() => setUserMenuOpen(!userMenuOpen)} aria-label="Tài khoản">
                  <FiUser size={20} />
                </button>
                {userMenuOpen && (
                  <div className="header__user-dropdown">
                    <div className="header__user-info">
                      <span className="header__user-name">{user?.fullName}</span>
                      <span className="header__user-email">{user?.email}</span>
                    </div>
                    <Link to="/orders" className="header__dropdown-link" onClick={() => setUserMenuOpen(false)}>
                      Đơn hàng của tôi
                    </Link>
                    <button className="header__dropdown-link header__dropdown-link--logout" onClick={handleLogout}>
                      <FiLogOut size={16} />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="header__action-btn" aria-label="Đăng nhập">
                <FiUser size={20} />
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="header__action-btn header__cart-btn" aria-label="Giỏ hàng">
              <FiShoppingBag size={20} />
              {cartCount > 0 && <span className="header__cart-count">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && <div className="header__overlay" onClick={() => setMobileMenuOpen(false)} />}

      {/* Spacer */}
      <div style={{ height: 'calc(var(--header-height) + 36px)' }} />
    </>
  );
}

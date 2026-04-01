import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { authAPI } from '../../api';
import { loginStart, loginSuccess, loginFailure } from '../../store/authSlice';
import './AuthPages.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await authAPI.login({ email, password });
      dispatch(loginSuccess(res.data));
      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.error || 'Đăng nhập thất bại';
      dispatch(loginFailure(msg));
      toast.error(msg);
    }
  };

  return (
    <div className="auth-page page-enter">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">ĐĂNG NHẬP</h1>
          <p className="auth-subtitle">Chào mừng bạn quay lại</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">MẬT KHẨU</label>
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary auth-submit" disabled={loading}>
              {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP'}
            </button>
          </form>

          <p className="auth-switch">
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>

          <div className="auth-demo-hint">
            <p className="auth-demo-hint__title">🔑 Tài khoản demo</p>
            <p><span>Email:</span>hieu@gmail.com</p>
            <p><span>Mật khẩu:</span>123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}

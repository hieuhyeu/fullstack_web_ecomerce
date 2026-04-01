import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { authAPI } from '../../api';
import { loginSuccess } from '../../store/authSlice';
import '../LoginPage/AuthPages.css';

export default function RegisterPage() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setLoading(true);
    try {
      const res = await authAPI.register({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });
      dispatch(loginSuccess(res.data));
      toast.success('Đăng ký thành công!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.email || 'Đăng ký thất bại';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page page-enter">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">ĐĂNG KÝ</h1>
          <p className="auth-subtitle">Tạo tài khoản mới</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="fullName">HỌ VÀ TÊN</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="input-field"
                placeholder="Nguyễn Văn A"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                id="email"
                name="email"
                type="email"
                className="input-field"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">MẬT KHẨU</label>
              <input
                id="password"
                name="password"
                type="password"
                className="input-field"
                placeholder="Tối thiểu 6 ký tự"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">XÁC NHẬN MẬT KHẨU</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="input-field"
                placeholder="Nhập lại mật khẩu"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary auth-submit" disabled={loading}>
              {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG KÝ'}
            </button>
          </form>

          <p className="auth-switch">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

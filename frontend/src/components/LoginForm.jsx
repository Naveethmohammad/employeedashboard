// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import '../styles/LoginForm.css'; // styling

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/employees/login', formData);
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="/login-image.png" alt="Login visual" />
      </div>
      <div className="login-right">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter your password" />
          <button type="submit">Sign In</button>
        </form>
        <p>Don't have an account? <Link to="/register">Create a new account</Link></p>
      </div>
    </div>
  );
};

export default LoginForm;

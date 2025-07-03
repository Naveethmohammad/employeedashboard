// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/RegisterForm.css';
import register from '../assets/register.png'// make sure to place image here
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    aadhaar: '',
    pan: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateFields = () => {
    const { name, email, password, aadhaar, pan } = formData;
    const aadhaarRegex = /^\d{12}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!name || !email || !password || !aadhaar || !pan) {
      return 'All fields are required';
    }
    if (!aadhaarRegex.test(aadhaar)) {
      return 'Invalid Aadhaar number';
    }
    if (!panRegex.test(pan)) {
      return 'Invalid PAN card format';
    }
    return '';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await api.post('/api/employees/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <img src={register} alt="Register visual" />
      </div>
      <div className="register-right">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />

          <label>Aadhaar Number</label>
          <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} placeholder="Enter your Aadhaar Number" required />

          <label>PAN Card</label>
          <input type="text" name="pan" value={formData.pan} onChange={handleChange} placeholder="Enter your PAN Card" required />

          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Sign In</Link></p>
      </div>
    </div>
  );
};

export default RegisterForm;


//==========================================
// src/components/RegisterForm.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import api from '../services/api';
// import '../styles/RegisterForm.css';

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     aadhaar: '',
//     pan: ''
//   });

//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const validateFields = () => {
//     const { name, email, password, aadhaar, pan } = formData;
//     const aadhaarRegex = /^\d{12}$/;
//     const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

//     if (!name || !email || !password || !aadhaar || !pan) {
//       return 'All fields are required';
//     }
//     if (!aadhaarRegex.test(aadhaar)) {
//       return 'Invalid Aadhaar number';
//     }
//     if (!panRegex.test(pan)) {
//       return 'Invalid PAN card format';
//     }
//     return '';
//   };

//   const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value});
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationError = validateFields();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       await api.post('/api/employees/register', formData);
//       navigate('/login');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="register-left">
//         <img src="/register-image.png" alt="Register visual" />
//       </div>
//       <div className="register-right">
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//           {error && <p className="error">{error}</p>}
//           <label>Name</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
          
//           <label>Email</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />

//           <label>Password</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />

//           <label>Aadhaar Number</label>
//           <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} placeholder="Enter your Aadhaar Number" required />

//           <label>PAN Card</label>
//           <input type="text" name="pan" value={formData.pan} onChange={handleChange} placeholder="Enter your PAN Card" required />

//           <button type="submit">Register</button>
//         </form>
//         <p>Already have an account? <Link to="/login">Sign In</Link></p>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './LoginModal.css'; 
import '../pages/Auth.css';

function RegisterModal() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login, closeRegisterModal } = useAuth();
  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const BACKEND_URL = 'https://literate-potato-9rpwrjrqxg5cp4p6-5000.app.github.dev';
      const response = await axios.post(`${BACKEND_URL}/api/users/register`, formData);
      if (response.data) {
        login(response.data);
        closeRegisterModal();
      }
    } catch (error) {
      alert(error.response.data.message || 'Registration failed.');
    }
  };
  
  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      closeRegisterModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="auth-graphic-panel"></div> {/* Image Panel */}
        <div className="auth-form-panel">     {/* Form Panel */}
          <h1>Create Account</h1>
          <form className="auth-form" onSubmit={onSubmit}>
            <input type="text" name="name" value={name} placeholder="Name" onChange={onChange} required />
            <input type="email" name="email" value={email} placeholder="Email" onChange={onChange} required />
            <input type="password" name="password" value={password} placeholder="Password" onChange={onChange} required />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
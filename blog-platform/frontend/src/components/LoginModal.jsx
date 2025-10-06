import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './LoginModal.css';
import '../pages/Auth.css';

function LoginModal() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, closeLoginModal } = useAuth();
  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // ADD THIS LINE FOR DEBUGGING
    console.log('Frontend is sending this data:', formData);
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${BACKEND_URL}/api/users/login`, formData);
      if (response.data) {
        login(response.data);
        closeLoginModal();
      }
    } catch (error) {
      alert('Wrong credentials. Please try again.');
      setFormData((prev) => ({ ...prev, password: '' }));
    }
  };
  
  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      closeLoginModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="auth-graphic-panel"></div> {/* Image Panel */}
        <div className="auth-form-panel">     {/* Form Panel */}
          <h1>Welcome Back</h1>
          <form className="auth-form" onSubmit={onSubmit}>
            <input type="email" name="email" value={email} placeholder="Email" onChange={onChange} required />
            <input type="password" name="password" value={password} placeholder="Password" onChange={onChange} required />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
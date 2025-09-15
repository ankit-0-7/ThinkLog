import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // <-- Import the useAuth hook
import { useNavigate } from 'react-router-dom';  // <-- Import the useNavigate hook

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuth();      // <-- Get the login function from our context
  const navigate = useNavigate(); // <-- Get the navigate function for redirection

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const BACKEND_URL = 'https://literate-potato-9rpwrjrqxg5cp4p6-5000.app.github.dev';
      const response = await axios.post(`${BACKEND_URL}/api/users/login`, formData);
      
      if (response.data) {
        // --- THIS PART IS UPDATED ---
        // 1. Call the global login function with the user data
        login(response.data); 
        // 2. Redirect the user to the homepage
        navigate('/'); 
      }
    } catch (error) {
      console.error('Login Error:', error.response.data);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" value={email} placeholder="Enter your email" onChange={onChange} />
        <input type="password" name="password" value={password} placeholder="Enter password" onChange={onChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default LoginPage;
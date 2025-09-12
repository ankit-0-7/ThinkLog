import { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the public URL from your Codespace backend
      const response = await axios.post('https://literate-potato-9rpwrjrqxg5cp4p6-5000.app.github.dev/api/users/register', formData);
      console.log('Success:', response.data);
      // You can redirect the user or show a success message here
    } catch (error) {
      console.error('Error:', error.response.data);
      // Show an error message to the user
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" value={name} placeholder="Enter your name" onChange={onChange} />
        <input type="email" name="email" value={email} placeholder="Enter your email" onChange={onChange} />
        <input type="password" name="password" value={password} placeholder="Enter password" onChange={onChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default RegisterPage;
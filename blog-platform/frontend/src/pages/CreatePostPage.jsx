import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Form.css';

function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // --- 1. ADD STATE FOR GENRE ---
  // Initialize with a default value from your list
  const [genre, setGenre] = useState('Tech'); 
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // This is the list of genres from your backend model
  const genres = ['Tech', 'Lifestyle', 'Health', 'Travel', 'Finance'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- 2. ADD 'genre' TO THE DATA BEING SENT ---
    const newPost = { title, content, genre };

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const BACKEND_URL = 'https://literate-potato-9rpwrjrqxg5cp4p6-5000.app.github.dev';
      await axios.post(`${BACKEND_URL}/api/posts`, newPost, config);
      navigate('/');
    } catch (error) {
      console.error('Failed to create post', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h1>Create a New Post</h1>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {/* --- 3. ADD THE GENRE DROPDOWN TO THE FORM --- */}
        <select value={genre} onChange={(e) => setGenre(e.target.value)} required>
          <option value="" disabled>Select a genre</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        
        <textarea
          placeholder="Write your post content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Publish Post</button>
      </form>
    </div>
  );
}

export default CreatePostPage;
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Form.css';

function EditPostPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const BACKEND_URL = 'https://literate-potato-9rpwrjrqxg5cp4p6-5000.app.github.dev';
        const { data } = await axios.get(`${BACKEND_URL}/api/posts/${id}`);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error('Failed to fetch post', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = { title, content };
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    try {
      const BACKEND_URL = 'https://literate-potato-9rpwrjrqxg5cp4p6-5000.app.github.dev';
      await axios.put(`${BACKEND_URL}/api/posts/${id}`, updatedPost, config);
      navigate('/');
    } catch (error) {
      console.error('Failed to update post', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h1>Edit Post</h1> {/* <-- FIX: Updated title */}
        <input
          type="text"
          placeholder="Post Title"
          // --- FIX: Add value and onChange ---
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your post content here..."
          // --- FIX: Add value and onChange ---
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default EditPostPage;
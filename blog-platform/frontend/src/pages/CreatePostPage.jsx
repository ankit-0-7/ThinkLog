import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth(); // Get user from context to access the token
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log('User object from context:', user);
    const newPost = { title, content };

    // Create the config object for the authenticated request
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const BACKEND_URL = 'https://literate-potato-9rpwrjrqxg5cp4p6-5000.app.github.dev';
      await axios.post(`${BACKEND_URL}/api/posts`, newPost, config);
      navigate('/'); // Redirect to homepage on success
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a New Post</h1>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Write your post content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">Publish Post</button>
    </form>
  );
}

export default CreatePostPage;
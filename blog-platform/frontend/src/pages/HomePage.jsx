import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const BACKEND_URL = 'https://literate-potato-9rpwrjrqxg5cp4p6-5000.app.github.dev';
        const response = await axios.get(`${BACKEND_URL}/api/posts`);
        setPosts(response.data);
      } catch (err) {
        setError('Failed to fetch posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // --- FIX: Add the logic inside this function ---
  const handleDelete = async (postId) => {
    // 1. Confirm with the user
    if (window.confirm('Are you sure you want to delete this post?')) {
      // 2. Double-check that a user is logged in and has a token
      if (!user || !user.token) {
        console.error('Authentication error: Cannot delete post.');
        return;
      }
      try {
        // 3. Prepare the authenticated request
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const BACKEND_URL = 'https://literate-potato-9rpwrjrqxg5cp4p6-5000.app.github.dev';
        
        // 4. Send the delete request to the backend
        await axios.delete(`${BACKEND_URL}/api/posts/${postId}`, config);
        
        // 5. Update the UI by filtering out the deleted post
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (error) {
        console.error('Failed to delete post', error);
      }
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-container">
      <h1>Latest Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post-excerpt">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {user && user._id === post.user && (
              <div className="post-actions">
                <Link to={`/edit-post/${post._id}`}>Edit</Link>
                {/* Ensure the type="button" is here */}
                <button type="button" onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No posts found. Be the first to create one!</p>
      )}
    </div>
  );
}

export default HomePage;  
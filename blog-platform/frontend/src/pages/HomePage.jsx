import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, openLoginModal } = useAuth();

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

  // --- FIX: The logic inside this function has been restored ---
  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      if (!user || !user.token) {
        console.error('Authentication error: Cannot delete post.');
        return;
      }
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const BACKEND_URL = 'https://literate-potato-9rpwrjrqxg5cp4p6-5000.app.github.dev';
        await axios.delete(`${BACKEND_URL}/api/posts/${postId}`, config);
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (error) {
        console.error('Failed to delete post', error);
      }
    }
  };

  const handleLike = async (postId) => {
    if (!user) {
      openLoginModal();
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const BACKEND_URL = 'https://literate-potato-9rpwrjrqxg5cp4p6-5000.app.github.dev';
      const { data } = await axios.put(`${BACKEND_URL}/api/posts/${postId}/like`, {}, config);
      setPosts(posts.map((post) => (post._id === postId ? data : post)));
    } catch (error) {
      console.error('Failed to like post', error);
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
            <p className="post-author">
              By: {user ? (
                <Link to={`/user/${post.user._id}`} className="author-link">
                  {post.user ? post.user.name : 'Unknown Author'}
                </Link>
              ) : (
                <button onClick={openLoginModal} className="author-link-button">
                  {post.user ? post.user.name : 'Unknown Author'}
                </button>
              )}
            </p>
            <p>{post.content}</p>

            <div className="post-actions">
              <button
                type="button"
                onClick={() => handleLike(post._id)}
                className={`like-button ${post.likes.includes(user?._id) ? 'liked' : ''}`}
              >
                ❤️ {post.likes.length}
              </button>

              {user && post.user && user._id === post.user._id && (
                <>
                  <Link to={`/edit-post/${post._id}`}>Edit</Link>
                  <button type="button" onClick={() => handleDelete(post._id)}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No posts found. Be the first to create one!</p>
      )}
    </div>
  );
}

export default HomePage;
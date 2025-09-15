import { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const BACKEND_URL = 'https://literate-potato-9rpwrjrqxg5cp4p6-5000.app.github.dev';
        const response = await axios.get(`${BACKEND_URL}/api/posts`);
        setPosts(response.data);
      } catch (err) {
        setError('Failed to fetch posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // The empty array ensures this runs only once when the component mounts

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Latest Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post-excerpt">
            <h2>{post.title}</h2>
            <p>{post.content.substring(0, 150)}...</p>
          </div>
        ))
      ) : (
        <p>No posts found. Be the first to create one!</p>
      )}
    </div>
  );
}

export default HomePage;
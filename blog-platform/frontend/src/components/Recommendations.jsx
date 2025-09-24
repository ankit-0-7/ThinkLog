import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Recommendations.css'; // We will create this file next

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get the logged-in user

  useEffect(() => {
    // Only fetch recommendations if a user is logged in
    if (user && user.token) {
      const fetchRecommendations = async () => {
        setLoading(true);
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const BACKEND_URL = 'https://literate-potato-9rpwrjrqxg5cp4p6-5000.app.github.dev';
          const { data } = await axios.get(`${BACKEND_URL}/api/posts/recommendations`, config);
          setRecommendations(data);
        } catch (error) {
          console.error('Failed to fetch recommendations', error);
        } finally {
          setLoading(false);
        }
      };

      fetchRecommendations();
    } else {
      setLoading(false); // If no user, we're not loading anything
    }
  }, [user]); // Re-run this effect if the user logs in or out

  // Don't render anything if loading, no user, or no recommendations
  if (loading || !user || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="recommendations-container">
      <h3>Recommended For You</h3>
      <div className="recommendations-list">
        {recommendations.map((post) => (
          <div key={post._id} className="rec-post">
            <Link to={`/user/${post.user._id}`} className="rec-post-title">{post.title}</Link>
            <span className="rec-post-author">by {post.user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
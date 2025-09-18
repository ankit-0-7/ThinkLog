import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css'; // Reuse homepage styles

function UserPostsPage() {
  const [posts, setPosts] = useState([]);
  const [authorName, setAuthorName] = useState('');
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const BACKEND_URL = 'https://literate-potato-9rpwrjrqxg5cp4p6-5000.app.github.dev';
        const response = await axios.get(`${BACKEND_URL}/api/posts/user/${userId}`);
        setPosts(response.data);
        
        if (response.data.length > 0) {
          setAuthorName(response.data[0].user.name);
        } else {
          // A more advanced version would fetch user's name separately
          setAuthorName("this user"); 
        }

      } catch (error) {
        console.error("Failed to fetch user's posts", error);
        setAuthorName("this user");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="home-container">
      <h1>Posts by {authorName}</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post-excerpt">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>This user has not posted anything yet.</p>
      )}
    </div>
  );
}

export default UserPostsPage;
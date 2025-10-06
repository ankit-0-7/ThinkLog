import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentsSection from '../components/CommentsSection'; // Import the new component
import './SinglePostPage.css'; // Import the stylesheet

function SinglePostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { postId } = useParams(); // Gets the ':postId' from the URL

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const { data } = await axios.get(`${BACKEND_URL}/api/posts/${postId}`);
        setPost(data);
      } catch (error) {
        console.error('Failed to fetch post', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="single-post-container">
      <h1>{post.title}</h1>
      <p className="post-author-single">By: {post.user ? post.user.name : 'Unknown'}</p>
      
      <div className="post-content-full">
        {post.content.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      
      <hr className="divider" />
      
      <CommentsSection postId={postId} />
    </div>
  );
}

export default SinglePostPage;
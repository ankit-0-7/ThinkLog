import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function CommentsSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const { data } = await axios.get(`${BACKEND_URL}/api/comments/post/${postId}`);
        setComments(data);
      } catch (error) {
        console.error('Failed to fetch comments', error);
      }
    };
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const { data } = await axios.post(`${BACKEND_URL}/api/comments`, { content: newComment, postId }, config);
      
      setComments([data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to post comment', error);
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {user && (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
          ></textarea>
          <button type="submit">Post Comment</button>
        </form>
      )}
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p className="comment-content">{comment.content}</p>
            <p className="comment-author">-- {comment.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsSection;
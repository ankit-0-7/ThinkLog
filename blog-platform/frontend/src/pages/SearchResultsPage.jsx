import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css'; // Reuse styles from the homepage

// This is a helper hook to easily get URL query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const searchTerm = query.get('q'); // Gets the search term from a URL like /search?q=yourterm

  useEffect(() => {
    const fetchResults = async () => {
      // Don't search if the search term is empty
      if (!searchTerm) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const BACKEND_URL = 'https://literate-potato-9rpwrjrqxg5cp4p6-5000.app.github.dev';
        // Construct the correct search URL
        const { data } = await axios.get(`${BACKEND_URL}/api/posts/search?q=${searchTerm}`);
        setResults(data);
      } catch (error) {
        console.error('Failed to fetch search results', error);
        setResults([]); // Clear results on error
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]); // Re-run the search whenever the searchTerm in the URL changes

  if (loading) return <p>Searching...</p>;

  return (
    <div className="home-container">
      <h1>Search Results for "{searchTerm}"</h1>
      {results.length > 0 ? (
        results.map((post) => (
          // We can reuse the same post excerpt style
          <div key={post._id} className="post-excerpt">
            <Link to={`/post/${post._id}`} className="post-title-link">
              <h2>{post.title}</h2>
            </Link>
            <p className="post-author">By: {post.user ? post.user.name : 'Unknown'}</p>
          </div>
        ))
      ) : (
        <p>No posts found matching your search.</p>
      )}
    </div>
  );
}

export default SearchResultsPage;
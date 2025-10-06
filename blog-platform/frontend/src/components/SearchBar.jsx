import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css'; // We'll create this next

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to a new 'search' page with the query as a parameter
      navigate(`/search?q=${query}`);
      setQuery(''); // Clear the search bar after submitting
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="search-input"
      />
    </form>
  );
}

export default SearchBar;
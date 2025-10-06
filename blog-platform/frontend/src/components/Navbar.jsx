import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar'; 

function Navbar() {
  const { user, logout, openLoginModal, openRegisterModal } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar-header">
       <div className="navbar-search">
        <SearchBar />
      </div>
      <div className="navbar-logo">
        <Link to="/">
          {/* --- ADD THE IMAGE TAG HERE --- */}
          <img 
            src="/favicon.png" // Assumes your icon is named favicon.png in the 'public' folder
            alt="ThinkLog Logo" 
            className="navbar-logo-img" 
          />
          ThinkLog
        </Link>
      </div>
      <nav className="navbar-nav">
        <ul>
          {user ? (
            <>
              <li><Link to="/create-post">Create Post</Link></li>
              <li className="navbar-greeting">Hello, {user.name}!</li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><button onClick={openLoginModal}>Login</button></li>
              <li><button onClick={openRegisterModal}>Register</button></li>
            </>
          )}
          <li><ThemeToggle /></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
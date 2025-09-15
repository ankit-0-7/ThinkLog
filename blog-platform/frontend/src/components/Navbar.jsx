import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">BlogPlatform</Link>
      </div>
      <nav>
        <ul>
          {user ? (
            // If user is logged in, show these links
            <>
              {/* --- ADD THIS LINE --- */}
              <li>
                <Link to="/create-post">Create Post</Link>
              </li>
              
              <li>Hello, {user.name}!</li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            // If user is not logged in, show these links
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
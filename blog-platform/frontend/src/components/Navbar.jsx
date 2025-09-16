import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout, openLoginModal, openRegisterModal } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar-header">
      <div className="navbar-logo">
        <Link to="/">ThinkLog</Link>
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
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
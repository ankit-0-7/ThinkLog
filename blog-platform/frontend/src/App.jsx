import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import { useAuth } from './context/AuthContext';

// Import all your pages
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import UserPostsPage from './pages/UserPostsPage';
import SinglePostPage from './pages/SinglePostPage'; // <-- 1. Import the new page

function App() {
  const { isLoginModalOpen, isRegisterModalOpen } = useAuth();

  return (
    <Router>
      {isLoginModalOpen && <LoginModal />}
      {isRegisterModalOpen && <RegisterModal />}
      <Navbar />
      <div className="container">
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:userId" element={<UserPostsPage />} /> {/* <-- 2. Moved to be public */}
          <Route path="/post/:postId" element={<SinglePostPage />} /> {/* <-- 3. Added new route */}
          
          {/* --- Protected Routes --- */}
          <Route element={<PrivateRoute />}>
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/edit-post/:id" element={<EditPostPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
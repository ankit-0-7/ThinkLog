import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';

function App() {
  const { isLoginModalOpen, isRegisterModalOpen } = useAuth();

  return (
    <Router>
      {isLoginModalOpen && <LoginModal />}
      {isRegisterModalOpen && <RegisterModal />}
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
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
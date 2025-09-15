import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage'; 
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<h1>Welcome to the blog !</h1>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/create-post" element={<PrivateRoute />}>
          <Route path="" element={<CreatePostPage />} /></Route>
          
          {/* You'll add other routes here later, like for login and home */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
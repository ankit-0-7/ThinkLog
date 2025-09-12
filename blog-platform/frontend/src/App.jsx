import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<h1>Welcome to the blog !</h1>} />
          <Route path="/register" element={<RegisterPage />} />
          {/* You'll add other routes here later, like for login and home */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
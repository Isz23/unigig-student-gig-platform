import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Common Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import BrowseGigs from './pages/BrowseGigs';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

// Student Pages
import Dashboard from './pages/Student/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50/50 flex flex-col justify-between">

        {/* Navigation Header */}
        <Header />

        {/* Dynamic Page Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<BrowseGigs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Student Dashboard Route එක /stddashboard ලෙස */}
            <Route path="/stddashboard" element={<Dashboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;
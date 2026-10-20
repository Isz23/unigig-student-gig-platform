import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Common Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import BrowseGigs from './pages/BrowseGigs';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50/50 flex flex-col justify-between">
        {/* හැම Page එකකටම පොදු Header එක */}
        <Header />

        {/* URL එක අනුව මාරු වන Pages */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<BrowseGigs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        {/* හැම Page එකකටම පොදු Footer එක */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
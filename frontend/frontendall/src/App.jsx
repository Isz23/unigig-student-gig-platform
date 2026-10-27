import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Common Components
import Header from './components/Header';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import BrowseGigs from './pages/BrowseGigs';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

// Student Pages
import Dashboard from './pages/Student/Dashboard';
import CreateGig from './pages/Student/CreateGig';

// Client Pages
import ClientDashboard from './pages/Client/ClientDashboard';
import PostJob from './pages/Client/PostJob'; // අලුතින් එක් කරන ලදී

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50/50 flex flex-col justify-between">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<BrowseGigs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Student Routes */}
            <Route path="/stddashboard" element={<Dashboard />} />
            <Route path="/create-gig" element={<CreateGig />} />

            {/* Client Routes */}
            <Route path="/clientdashboard" element={<ClientDashboard />} />
            <Route path="/post-job" element={<PostJob />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Compass,
  Search,
  ChevronDown,
  LayoutGrid,
  Menu,
  X,
  MessageSquare,
  Plus,
  LogOut
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      return saved && token ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      setUser(saved && token ? JSON.parse(saved) : null);
    } catch {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleStudentHubClick = () => {
    if (user?.role === 'student') {
      navigate('/stddashboard');
    } else {
      navigate('/login?role=student');
    }
    setMobileMenuOpen(false);
  };

  const handleClientHubClick = () => {
    if (user?.role === 'client') {
      // නියම Client Management Dashboard එකට navigate වීම
      navigate('/clientdashboard');
    } else {
      navigate('/login?role=client');
    }
    setMobileMenuOpen(false);
  };

  const hideCategoryBar =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname.startsWith('/stddashboard') ||
    location.pathname.startsWith('/student/dashboard') ||
    location.pathname.startsWith('/clientdashboard') ||
    location.pathname.startsWith('/client/dashboard') ||
    location.pathname.startsWith('/create-gig') ||
    location.pathname.startsWith('/post-job') ||
    location.pathname.startsWith('/browse-jobs') ||
    location.pathname.startsWith('/messages');

  const categories = [
    { name: 'All Categories', icon: true },
    { name: 'Academics & Tutoring' },
    { name: 'Coding & Tech' },
    { name: 'Graphics & UI/UX' },
    { name: 'Writing & Proofreading' },
    { name: 'Video & Media' },
    { name: 'Campus Services' },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }
    if (selectedCategory && selectedCategory !== 'All Categories') {
      params.set('category', selectedCategory);
    }
    navigate(`/browse${params.toString() ? `?${params.toString()}` : ''}`);
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    if (categoryName === 'All Categories') {
      navigate('/browse');
    } else {
      navigate(`/browse?category=${encodeURIComponent(categoryName)}`);
    }
  };

  const isClientActive =
    location.pathname.startsWith('/clientdashboard') ||
    location.pathname.startsWith('/client/dashboard');

  const isStudentActive =
    location.pathname.startsWith('/stddashboard') ||
    location.pathname.startsWith('/student/dashboard');

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-2xs font-sans select-none">
      <div className="bg-[#007a4d] text-white text-xs sm:text-sm px-4 lg:px-8 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium tracking-tight">
          <span className="text-sm">🎓</span>
          <span className="text-[11px] sm:text-xs">
            The <strong className="font-bold">#1 Verified University Gig Marketplace</strong> | Safe Peer-to-Peer Student Services
          </span>
        </div>

        <Link
          to="/browse"
          className="hidden sm:inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-colors"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explore Gigs</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 cursor-pointer shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#007a4d] flex items-center justify-center text-white font-extrabold text-lg sm:text-xl shadow-xs">
            U
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900">
              Uni<span className="text-[#007a4d]">Gig</span>
            </span>
            <span className="text-[9px] font-bold text-gray-400 tracking-[0.16em] uppercase mt-0.5">
              Campus Marketplace
            </span>
          </div>
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-xl mx-2 lg:mx-4 items-center bg-gray-50/80 border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#007a4d] focus-within:ring-2 focus-within:ring-[#007a4d]/20 focus-within:bg-white transition-all shadow-2xs"
        >
          <div className="relative flex items-center shrink-0 border-r border-gray-200 px-3 py-2 bg-transparent text-gray-600 text-xs font-semibold">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-transparent pr-6 cursor-pointer outline-none text-gray-700 font-medium text-xs"
            >
              <option>All Categories</option>
              <option>Academics & Tutoring</option>
              <option>Coding & Tech</option>
              <option>Graphics & UI/UX</option>
              <option>Writing & Proofreading</option>
              <option>Video & Media</option>
              <option>Campus Services</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 pointer-events-none" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What campus service do you need?"
            className="w-full px-3 py-2 text-xs sm:text-sm bg-transparent outline-none placeholder:text-gray-400 text-gray-800"
          />

          <button
            type="submit"
            aria-label="Search"
            className="m-1 bg-[#007a4d] hover:bg-[#00633e] text-white p-2 rounded-lg transition-colors flex items-center justify-center shrink-0 shadow-2xs active:scale-95 cursor-pointer"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 text-xs sm:text-sm font-semibold">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              location.pathname === '/'
                ? 'bg-[#eaf8f1] text-[#007a4d]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Home
          </Link>

          <Link
            to="/browse"
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              location.pathname === '/browse'
                ? 'bg-[#eaf8f1] text-[#007a4d]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Browse Gigs
          </Link>

          <Link
            to="/browse-jobs"
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              location.pathname === '/browse-jobs'
                ? 'bg-[#eaf8f1] text-[#007a4d]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Task Requests
          </Link>

          {user ? (
            <>
              <div className="h-4 w-px bg-gray-200"></div>

              <button
                type="button"
                onClick={handleStudentHubClick}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  isStudentActive
                    ? 'bg-[#007a4d] text-white'
                    : 'text-[#007a4d] bg-[#eaf8f1] hover:bg-emerald-100'
                }`}
              >
                Student Hub
              </button>

              <button
                type="button"
                onClick={handleClientHubClick}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  isClientActive
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-800 bg-blue-50 hover:bg-blue-100'
                }`}
              >
                Client Hub
              </button>

              <Link
                to="/messages"
                aria-label="Messages"
                className="p-2 text-gray-500 hover:text-[#007a4d] hover:bg-emerald-50/60 rounded-xl transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </Link>

              <div className="pl-1 border-l border-gray-100 flex items-center gap-2">
                <NotificationDropdown />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 text-gray-700 hover:text-red-600 hover:bg-red-50 font-bold px-3 py-1.5 rounded-xl transition-colors text-xs cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="pl-1 border-l border-gray-100 flex items-center gap-2">
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 font-bold px-2 py-1.5 transition-colors text-xs"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="bg-[#007a4d] hover:bg-[#00633e] text-white font-bold px-4 py-2 rounded-xl transition-all shadow-2xs active:scale-95 text-xs"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-1.5">
          {user && (
            <>
              <Link
                to="/messages"
                aria-label="Messages"
                className="p-1.5 text-gray-600 hover:text-[#007a4d] transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
              </Link>

              <NotificationDropdown />
            </>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {!hideCategoryBar && (
        <div className="border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat.name;

                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#007a4d] text-white shadow-2xs'
                        : 'bg-gray-100/70 text-gray-600 hover:text-gray-900 hover:bg-gray-200/70'
                    }`}
                  >
                    {cat.icon && <LayoutGrid className="w-3.5 h-3.5" />}
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 px-4 py-4 space-y-4 bg-white animate-in fade-in duration-150">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden p-1 shadow-2xs"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What campus service do you need?"
              className="w-full px-3 py-1.5 text-xs bg-transparent outline-none text-gray-800"
            />
            <button
              type="submit"
              className="bg-[#007a4d] hover:bg-[#00633e] text-white p-2 rounded-lg transition-colors shrink-0 cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-col gap-1 pt-1 text-xs font-bold">
            <Link
              to="/"
              className={`py-2.5 px-3 rounded-xl transition-colors ${
                location.pathname === '/'
                  ? 'bg-[#eaf8f1] text-[#007a4d]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/browse"
              className={`py-2.5 px-3 rounded-xl transition-colors ${
                location.pathname === '/browse'
                  ? 'bg-[#eaf8f1] text-[#007a4d]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Browse Gigs
            </Link>

            <Link
              to="/browse-jobs"
              className={`py-2.5 px-3 rounded-xl transition-colors ${
                location.pathname === '/browse-jobs'
                  ? 'bg-[#eaf8f1] text-[#007a4d]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Task Requests (Bidding)
            </Link>

            {user ? (
              <>
                <Link
                  to="/create-gig"
                  className="py-2.5 px-3 rounded-xl text-[#007a4d] bg-[#eaf8f1] flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post a New Gig</span>
                </Link>

                <div className="h-px bg-gray-100 my-1" />

                <div className="flex gap-2 py-1">
                  <button
                    type="button"
                    onClick={handleStudentHubClick}
                    className="flex-1 text-center py-2.5 text-xs font-bold text-[#007a4d] bg-[#eaf8f1] rounded-xl border border-emerald-100 cursor-pointer"
                  >
                    Student Hub
                  </button>
                  <button
                    type="button"
                    onClick={handleClientHubClick}
                    className="flex-1 text-center py-2.5 text-xs font-bold text-blue-800 bg-blue-50 rounded-xl border border-blue-100 cursor-pointer"
                  >
                    Client Hub
                  </button>
                </div>

                <div className="h-px bg-gray-100 my-1" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 text-red-600 hover:bg-red-50 font-bold py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <div className="h-px bg-gray-100 my-1" />

                <Link
                  to="/login"
                  className="text-gray-700 font-bold py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Log In
                </Link>

                <Link
                  to="/signup"
                  className="w-full bg-[#007a4d] hover:bg-[#00633e] text-white font-bold py-3 rounded-xl text-center block mt-1 shadow-2xs transition-all active:scale-95"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
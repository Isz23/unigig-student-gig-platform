import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Compass,
  Search,
  ChevronDown,
  LayoutGrid,
  Menu,
  X
} from 'lucide-react';

export default function Header() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Home');
  const [activeCategory, setActiveCategory] = useState('Academics & Tutoring');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // දැනට තිබෙන URL Path එක ලබා ගැනීම
  const location = useLocation();

  // /login, /signup, dashboards හෝ task-post පිටුවලදී Categories Bar එක සඟවන්න (Hide කරන්න)
  const hideCategoryBar =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname.startsWith('/stddashboard') ||
    location.pathname.startsWith('/clientdashboard') ||
    location.pathname.startsWith('/create-gig') ||
    location.pathname.startsWith('/post-job') ||
    location.pathname.startsWith('/browse-jobs');

  // Category list for the bottom navigation bar
  const categories = [
    { name: 'All Categories', icon: true, highlighted: false },
    { name: 'Academics & Tutoring', highlighted: true },
    { name: 'Coding & Tech', highlighted: true },
    { name: 'Graphics & UI/UX', highlighted: false },
    { name: 'Writing & Proofreading', highlighted: false },
    { name: 'Video & Animation', highlighted: false },
    { name: 'Campus Services', highlighted: true },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm font-sans select-none">
      {/* ---------------- 1. Top Announcement Bar ---------------- */}
      <div className="bg-[#007a4d] text-white text-xs sm:text-sm px-4 lg:px-8 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium tracking-tight">
          <span className="text-base">🎓</span>
          <span>
            The <strong className="font-bold">#1 Verified University Gig Marketplace</strong> | Safe Peer-to-Peer Student Services
          </span>
        </div>

        {/* Explore Gigs pill button */}
        <Link
          to="/browse"
          onClick={() => setActiveTab('Browse Gigs')}
          className="hidden sm:inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-colors"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explore Gigs</span>
        </Link>
      </div>

      {/* ---------------- 2. Main Navigation Bar ---------------- */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => setActiveTab('Home')}
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-[#007a4d] flex items-center justify-center text-white font-extrabold text-xl shadow-sm">
            U
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Uni<span className="text-[#00a86b]">Gig</span>
            </span>
            <span className="text-[9px] font-bold text-gray-400 tracking-[0.16em] uppercase mt-0.5">
              Campus Marketplace
            </span>
          </div>
        </Link>

        {/* Search Bar Container */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4 items-center bg-gray-50/70 border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#007a4d] focus-within:ring-2 focus-within:ring-[#007a4d]/20 transition-all">

          {/* Category Dropdown */}
          <div className="relative flex items-center shrink-0 border-r border-gray-200 px-3 py-2 bg-transparent text-gray-600 text-sm font-medium">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-transparent pr-6 cursor-pointer outline-none text-gray-700 font-medium"
            >
              <option>All Categories</option>
              <option>Academics & Tutoring</option>
              <option>Coding & Tech</option>
              <option>Graphics & UI/UX</option>
              <option>Campus Services</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 pointer-events-none" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What campus service do you need?"
            className="w-full px-3.5 py-2 text-sm bg-transparent outline-none placeholder:text-gray-400 text-gray-700"
          />

          {/* Search Button */}
          <button
            type="button"
            aria-label="Search"
            className="m-1 bg-[#007a4d] hover:bg-[#006640] text-white p-2.5 rounded-lg transition-colors flex items-center justify-center shrink-0"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Desktop Navigation & Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-5 text-sm font-medium">
          <Link
            to="/"
            onClick={() => setActiveTab('Home')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-colors ${
              activeTab === 'Home'
                ? 'bg-[#e8f7f0] text-[#00875a]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Home
          </Link>

          <Link
            to="/browse"
            onClick={() => setActiveTab('Browse Gigs')}
            className={`transition-colors ${
              activeTab === 'Browse Gigs'
                ? 'bg-[#e8f7f0] text-[#00875a] px-3.5 py-1.5 rounded-full font-semibold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Browse Gigs
          </Link>

          {/* අලුතින් එක් කළ Bidding / Task Requests Link */}
          <Link
            to="/browse-jobs"
            onClick={() => setActiveTab('Task Requests')}
            className={`transition-colors flex items-center gap-1 ${
              activeTab === 'Task Requests'
                ? 'bg-[#e8f7f0] text-[#00875a] px-3.5 py-1.5 rounded-full font-semibold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>Task Requests</span>
          </Link>

          <div className="h-4 w-px bg-gray-200"></div>

          {/* Dashboards Switcher Links */}
          <Link
            to="/stddashboard"
            className="px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors"
          >
            Student Hub
          </Link>

          <Link
            to="/clientdashboard"
            className="px-2.5 py-1 rounded-lg text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            Client Hub
          </Link>

          <Link
            to="/login"
            className="text-gray-700 hover:text-gray-900 font-semibold transition-colors text-xs"
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className="bg-[#007a4d] hover:bg-[#006640] text-white font-semibold px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95 text-xs"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ---------------- 3. Bottom Category Bar (Dashboard & Auth පිටුවලදී Hide වේ) ---------------- */}
      {!hideCategoryBar && (
        <div className="border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2.5">
            <div className="flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] text-xs sm:text-sm">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat.name;

                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setActiveCategory(cat.name)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5 shrink-0 ${
                      cat.icon ? 'text-gray-700 hover:text-gray-900 font-semibold' : ''
                    } ${
                      cat.highlighted || isSelected
                        ? 'bg-[#eaf8f1] text-[#00875a] font-semibold'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {cat.icon && <LayoutGrid className="w-3.5 h-3.5 text-gray-600" />}
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Mobile Menu Dropdown ---------------- */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 px-4 py-4 space-y-4 bg-white">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden p-1">
            <input
              type="text"
              placeholder="What campus service do you need?"
              className="w-full px-3 py-1.5 text-sm bg-transparent outline-none text-gray-700"
            />
            <button className="bg-[#007a4d] text-white p-2 rounded-lg">
              <Search className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-1 pt-2">
            <Link
              to="/"
              onClick={() => {
                setActiveTab('Home');
                setMobileMenuOpen(false);
              }}
              className={`text-left font-semibold py-2.5 px-3 rounded-lg transition-colors ${
                activeTab === 'Home'
                  ? 'bg-[#e8f7f0] text-[#00875a]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/browse"
              onClick={() => {
                setActiveTab('Browse Gigs');
                setMobileMenuOpen(false);
              }}
              className={`text-left font-semibold py-2.5 px-3 rounded-lg transition-colors ${
                activeTab === 'Browse Gigs'
                  ? 'bg-[#e8f7f0] text-[#00875a]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Browse Gigs
            </Link>

            {/* Mobile Task Requests Link */}
            <Link
              to="/browse-jobs"
              onClick={() => {
                setActiveTab('Task Requests');
                setMobileMenuOpen(false);
              }}
              className={`text-left font-semibold py-2.5 px-3 rounded-lg transition-colors ${
                activeTab === 'Task Requests'
                  ? 'bg-[#e8f7f0] text-[#00875a]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Task Requests (Bidding)
            </Link>

            <hr className="border-gray-100 my-2" />

            {/* Mobile Dashboard Links */}
            <div className="flex gap-2 py-1">
              <Link
                to="/stddashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 text-xs font-bold text-emerald-800 bg-emerald-50 rounded-xl"
              >
                Student Hub
              </Link>
              <Link
                to="/clientdashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 text-xs font-bold text-blue-800 bg-blue-50 rounded-xl"
              >
                Client Hub
              </Link>
            </div>

            <hr className="border-gray-100 my-2" />

            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left text-gray-700 font-semibold py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Log In
            </Link>

            <Link
              to="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#007a4d] hover:bg-[#006640] text-white font-semibold py-3 rounded-xl text-center block mt-2 shadow-sm transition-all active:scale-95"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
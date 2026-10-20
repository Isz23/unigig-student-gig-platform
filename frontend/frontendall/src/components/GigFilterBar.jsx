import { useState } from 'react';

const GigFilterBar = ({ onSearch, onSortChange, onBudgetChange, onCategoryChange, totalResults = 8 }) => {
  const [activeCategory, setActiveCategory] = useState('All Gigs');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Recommended');
  const [budgetOption, setBudgetOption] = useState('Any Budget');

  const categories = [
    { name: 'All Gigs', icon: '▦' },
    { name: 'Academics & Tutoring', icon: '🎓' },
    { name: 'Coding & Tech', icon: '</>' },
    { name: 'Graphics & Design', icon: '🎨' },
    { name: 'Writing & Proofreading', icon: '✏️' },
    { name: 'Video & Animation', icon: '📹' },
    { name: 'Campus Services', icon: '🚲' },
  ];

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    if (onCategoryChange) onCategoryChange(categoryName);
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-4">
      {/* Search, Sort, and Budget Card */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full lg:flex-1">
            <span className="absolute inset-y-0 left-3.5 flex items-center text-slate-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
              placeholder="Search by subject, skill, student name, or university..."
              className="w-full bg-slate-100/70 border-0 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition"
            />
          </div>

          {/* Controls Right (Sort & Budget) */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1 text-slate-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                Sort:
              </span>
              <select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  if (onSortChange) onSortChange(e.target.value);
                }}
                className="bg-slate-100/70 border border-emerald-500/30 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
              >
                <option value="Recommended">Recommended</option>
                <option value="Highest Rated">Highest Rated</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Most Reviewed">Most Reviewed</option>
              </select>
            </div>

            {/* Budget Dropdown */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1 text-slate-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h10M7 11h10M7 15h10" />
                </svg>
                Budget:
              </span>
              <select
                value={budgetOption}
                onChange={(e) => {
                  setBudgetOption(e.target.value);
                  if (onBudgetChange) onBudgetChange(e.target.value);
                }}
                className="bg-slate-100/70 border-0 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
              >
                <option value="Any Budget">Any Budget</option>
                <option value="Under $20">Under $20</option>
                <option value="$20 - $50">$20 - $50</option>
                <option value="$50 - $100">$50 - $100</option>
                <option value="$100+">$100+</option>
              </select>
            </div>

          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 mt-4 pt-3 overflow-x-auto no-scrollbar border-t border-slate-100">
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat.name)}
                className={`text-xs px-3.5 py-2 rounded-xl font-semibold transition whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Label */}
      <p className="text-xs font-medium text-slate-500 mt-4 px-1">
        Found <span className="text-slate-900 font-extrabold">{totalResults}</span> student services
      </p>
    </div>
  );
};

export default GigFilterBar;
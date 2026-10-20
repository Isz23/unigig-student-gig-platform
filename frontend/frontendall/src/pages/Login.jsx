import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend API සම්බන්ධ කළ පසු මෙතනින් authentication සිදු කෙරේ
    console.log({ email, password, rememberMe });
    navigate('/browse'); // දැනට login වූ පසු Browse page එකට redirect වේ
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 font-sans bg-gray-50/60">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)] p-8 sm:p-10">
        
        {/* Header & Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#007a4d] text-white font-extrabold text-2xl shadow-sm mb-4">
            U
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Log in with your verified university credentials
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* University Email */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Campus Email
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu / .ac.lk"
                className="w-full pl-10 pr-4 py-3 bg-gray-50/70 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#007a4d] focus:bg-white focus:ring-2 focus:ring-[#007a4d]/20 transition-all text-gray-800"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Password
              </label>
              <a href="#forgot" className="text-xs font-semibold text-[#007a4d] hover:underline">
                Forgot?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-11 py-3 bg-gray-50/70 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#007a4d] focus:bg-white focus:ring-2 focus:ring-[#007a4d]/20 transition-all text-gray-800"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#007a4d] focus:ring-[#007a4d] border-gray-300 cursor-pointer"
              />
              <span className="text-xs text-gray-600 font-medium">Keep me signed in</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#007a4d] hover:bg-[#006640] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
          >
            <span>Log In to UniGig</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Restricted to Verified University Students</span>
        </div>

        {/* Switch to Sign Up */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Don't have an account yet?{' '}
          <Link to="/signup" className="text-[#007a4d] font-bold hover:underline">
            Sign Up here
          </Link>
        </p>

      </div>
    </div>
  );
}
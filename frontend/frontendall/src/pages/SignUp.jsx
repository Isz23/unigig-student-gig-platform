import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  CreditCard, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    university: '',
    studentId: '',
    role: 'both', // 'buyer', 'seller', 'both'
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match!');
      return;
    }
    if (!formData.agreeTerms) {
      setErrorMsg('Please accept the Student Honor Code & Terms.');
      return;
    }

    setErrorMsg('');
    console.log('Registration Data:', formData);
    // Backend API සම්බන්ධ කළ පසු database එකට save කරනු ලැබේ
    navigate('/login');
  };

  return (
    <div className="min-h-screen py-14 px-4 sm:px-6 lg:px-8 font-sans bg-gray-50/60 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)] p-8 sm:p-12">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf8f1] text-[#00875a] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Verified Campus Freelancers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Create Student Account
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Get assignments done, hire talented classmates, or monetize your skills.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium text-center">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Dulaksha Nipun"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#007a4d] focus:bg-white focus:ring-2 focus:ring-[#007a4d]/20 transition-all text-gray-800"
              />
            </div>
          </div>

          {/* University Email */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              University Email (.ac.lk / .edu)
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="student@seu.ac.lk / name@stanford.edu"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#007a4d] focus:bg-white focus:ring-2 focus:ring-[#007a4d]/20 transition-all text-gray-800"
              />
            </div>
          </div>

          {/* University Name & Student ID Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                University
              </label>
              <div className="relative flex items-center">
                <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  name="university"
                  required
                  value={formData.university}
                  onChange={handleChange}
                  placeholder="e.g. SEUSL / MIT"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#007a4d] focus:bg-white focus:ring-2 focus:ring-[#007a4d]/20 transition-all text-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Student Reg / ID No
              </label>
              <div className="relative flex items-center">
                <CreditCard className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  name="studentId"
                  required
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="e.g. SEU/IS/22/ICT/047"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#007a4d] focus:bg-white focus:ring-2 focus:ring-[#007a4d]/20 transition-all text-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Purpose / Role Selection */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              I want to:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'buyer', label: 'Hire Peers' },
                { id: 'seller', label: 'Offer Gigs' },
                { id: 'both', label: 'Both' },
              ].map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: role.id })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    formData.role === role.id
                      ? 'bg-[#eaf8f1] border-[#007a4d] text-[#007a4d] shadow-sm'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          {/* Password & Confirm Password Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#007a4d] focus:bg-white focus:ring-2 focus:ring-[#007a4d]/20 transition-all text-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#007a4d] focus:bg-white focus:ring-2 focus:ring-[#007a4d]/20 transition-all text-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Student Honor Code Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-0.5 w-4 h-4 rounded text-[#007a4d] focus:ring-[#007a4d] border-gray-300 cursor-pointer"
              />
              <span className="text-xs text-gray-600 leading-relaxed">
                I agree to the <span className="font-semibold text-gray-900">Student Honor Code</span> and promise not to submit academic-dishonesty work on UniGig.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#007a4d] hover:bg-[#006640] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
          >
            <span>Create Student Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch to Log In */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#007a4d] font-bold hover:underline">
            Log In
          </Link>
        </p>

      </div>
    </div>
  );
}
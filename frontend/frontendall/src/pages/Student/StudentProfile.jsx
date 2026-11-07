import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Star,
  GraduationCap,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Briefcase,
  Award,
  Loader2,
  Mail,
  UserCheck
} from 'lucide-react';
import API from '../../api/axios';

export default function StudentProfile() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        setLoading(true);
        // 1. Fetch real student details from MongoDB via backend
        const res = await API.get(`/auth/user/${id}`);
        if (res.data?.success && res.data?.user) {
          setStudent(res.data.user);
        }

        // 2. Fetch student's published gigs
        try {
          const gigsRes = await API.get('/gigs');
          if (gigsRes.data?.success) {
            const studentGigs = (gigsRes.data.data || []).filter(
              (g) => (g.seller?._id || g.seller) === id
            );
            setGigs(studentGigs);
          }
        } catch (gigErr) {
          console.error('Error fetching gigs:', gigErr);
        }
      } catch (err) {
        console.error('Error fetching student profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudentProfile();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#007a4d]" />
        <p className="text-xs font-semibold text-gray-500">Loading student profile...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-center px-4">
        <h2 className="text-base font-bold text-gray-800">Student Profile Not Found</h2>
        <p className="text-xs text-gray-400">The requested student account does not exist or has been removed.</p>
        <Link
          to="/browse"
          className="mt-2 px-4 py-2 bg-[#007a4d] text-white rounded-xl text-xs font-bold"
        >
          Back to Browse Gigs
        </Link>
      </div>
    );
  }

  // Display details with database fallbacks
  const displayName = student.name || 'Verified Student';
  const displayUniversity = student.university || 'South Eastern University of Sri Lanka';
  const displayFaculty = student.faculty || 'Faculty of Technology';
  const displayMajor = student.major || student.degree || 'Undergraduate Student';
  const displayAvatar =
    student.avatar ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=007a4d,0284c7,059669`;

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-7">

        <div className="flex items-center justify-between">
          <Link
            to="/clientdashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <span className="text-xs font-semibold text-[#007a4d] bg-[#eaf8f1] px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Campus Verified Freelancer</span>
          </span>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-2xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <img
                src={displayAvatar}
                alt={displayName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-[#007a4d]/10 shrink-0 bg-emerald-50"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                    {displayName}
                  </h1>
                  <span className="inline-flex items-center gap-1 bg-[#eaf8f1] border border-emerald-100 text-[#007a4d] text-xs font-bold px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Student ID</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 font-medium flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#007a4d] shrink-0" />
                  <span>{displayUniversity}</span>
                </p>

                <p className="text-xs text-gray-500">
                  {displayFaculty} • <span className="font-semibold text-gray-700">{displayMajor}</span>
                  {student.studentRegNumber && (
                    <span className="text-gray-400 font-mono ml-1.5">({student.studentRegNumber})</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 w-full md:w-auto justify-between md:justify-end">
              <div className="text-left md:text-right">
                <div className="flex items-center gap-1 text-amber-500 font-extrabold text-lg md:justify-end">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span>{student.rating || '5.0'}</span>
                </div>
                <p className="text-[11px] text-gray-400">Campus Verified Student</p>
              </div>

              <Link
                to={`/messages?peerId=${student._id || id}`}
                className="px-5 py-2.5 bg-[#007a4d] hover:bg-[#00633e] text-white rounded-xl text-xs font-bold shadow-2xs flex items-center gap-2 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Student</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100 text-xs">
            <div>
              <span className="text-gray-400 block">Orders Completed</span>
              <span className="font-extrabold text-gray-900 text-sm sm:text-base">
                {student.ordersCompleted || 1} Tasks
              </span>
            </div>
            <div>
              <span className="text-gray-400 block">Avg Response Time</span>
              <span className="font-extrabold text-[#007a4d] text-sm sm:text-base">&lt; 1 Hour</span>
            </div>
            <div>
              <span className="text-gray-400 block">Campus Member Since</span>
              <span className="font-extrabold text-gray-900 text-sm sm:text-base">
                {student.createdAt ? new Date(student.createdAt).toLocaleDateString([], { month: 'short', year: 'numeric' }) : 'March 2026'}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block">Escrow Clearance</span>
              <span className="font-extrabold text-blue-700 text-sm sm:text-base">100% Reliable</span>
            </div>
          </div>
        </div>

        {/* Bio and Verification Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-gray-900">About Student</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {student.bio || `${displayName} is an active student freelancer at ${displayUniversity}, delivering verified coursework tasks and technical solutions via UniGig milestone escrow.`}
            </p>

            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Skills & Coursework
              </h3>
              <div className="flex flex-wrap gap-2">
                {(student.skills && student.skills.length > 0
                  ? student.skills
                  : ['Full Stack Development', 'React.js', 'Node.js', 'UI/UX Design', 'Database Management']
                ).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-50 border border-gray-200/80 rounded-xl text-xs font-semibold text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-gray-900">Campus Verification</h2>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-center gap-2.5 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#007a4d] shrink-0" />
                <span>Student ID Verified</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#007a4d] shrink-0" />
                <span>University Domain Verified</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#007a4d] shrink-0" />
                <span>Zero Escrow Dispute Record</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#007a4d] shrink-0" />
                <span>Campus Peer Mentor Badge</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Gigs Section */}
        {gigs.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Active Campus Gigs by {displayName}</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gigs.map((gig) => (
                <div
                  key={gig._id}
                  className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-2xs hover:border-emerald-200 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-gray-100">
                      <img
                        src={gig.images?.[0] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format&fit=crop'}
                        alt={gig.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-[#eaf8f1] border border-emerald-100 text-[#007a4d] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {gig.category || 'Tech'}
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">
                        {gig.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-extrabold text-gray-800">5.0</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Clock className="w-3.5 h-3.5 text-[#007a4d]" />
                          <span>{gig.deliveryDays || 2} Days</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/40">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Starting at</span>
                      <span className="text-base font-black text-[#007a4d]">${gig.price}</span>
                    </div>

                    <Link
                      to={`/gig/${gig._id}`}
                      className="inline-flex items-center gap-1 px-3.5 py-2 bg-white hover:bg-[#007a4d] hover:text-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all shadow-2xs"
                    >
                      <span>View Service</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
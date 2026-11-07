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
  Building,
  Loader2,
  Award
} from 'lucide-react';
import API from '../../api/axios';

export default function ClientProfile() {
  const { id } = useParams();

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientProfile = async () => {
      try {
        setLoading(true);
        // MongoDB user id එකෙන් client විස්තර ලබා ගැනීම
        const res = await API.get(`/auth/user/${id}`);
        if (res.data?.success && res.data?.user) {
          setClient(res.data.user);
        }
      } catch (err) {
        console.error('Error fetching client profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClientProfile();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#007a4d]" />
        <p className="text-xs font-semibold text-gray-500">Loading client profile...</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-center px-4">
        <h2 className="text-base font-bold text-gray-800">Client Profile Not Found</h2>
        <p className="text-xs text-gray-400">The requested client account does not exist or has been removed.</p>
        <Link
          to="/stddashboard"
          className="mt-2 px-4 py-2 bg-[#007a4d] text-white rounded-xl text-xs font-bold"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const displayName = client.name || 'Verified Client';
  const displayUniversity = client.university || 'Campus Client / Organization';
  const displayFaculty = client.faculty || client.department || 'Verified Academic Client';
  const displayAvatar =
    client.avatar ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=007a4d,0284c7,4f46e5`;

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-7">

        {/* Back Link & Badge */}
        <div className="flex items-center justify-between">
          <Link
            to="/stddashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <span className="text-xs font-semibold text-[#007a4d] bg-[#eaf8f1] px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Campus Buyer</span>
          </span>
        </div>

        {/* Client Header Card */}
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
                    <span>Verified Client</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 font-medium flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#007a4d] shrink-0" />
                  <span>{displayUniversity}</span>
                </p>

                <p className="text-xs text-gray-500">
                  {displayFaculty}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 w-full md:w-auto justify-between md:justify-end">
              <div className="text-left md:text-right">
                <div className="flex items-center gap-1 text-amber-500 font-extrabold text-lg md:justify-end">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span>5.0</span>
                </div>
                <p className="text-[11px] text-gray-400">(Campus Verified Buyer)</p>
              </div>

              {/* Message Client Action */}
              <Link
                to={`/messages?peerId=${client._id || id}`}
                className="px-5 py-2.5 bg-[#007a4d] hover:bg-[#00633e] text-white rounded-xl text-xs font-bold shadow-2xs flex items-center gap-2 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Client</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100 text-xs">
            <div>
              <span className="text-gray-400 block">Total Tasks Posted</span>
              <span className="font-extrabold text-gray-900 text-sm sm:text-base">1 Task</span>
            </div>
            <div>
              <span className="text-gray-400 block">Hire Rate</span>
              <span className="font-extrabold text-[#007a4d] text-sm sm:text-base">100%</span>
            </div>
            <div>
              <span className="text-gray-400 block">Total Invested</span>
              <span className="font-extrabold text-gray-900 text-sm sm:text-base">$34.00</span>
            </div>
            <div>
              <span className="text-gray-400 block">Member Since</span>
              <span className="font-extrabold text-gray-900 text-sm sm:text-base">
                {client.createdAt
                  ? new Date(client.createdAt).toLocaleDateString([], { month: 'short', year: 'numeric' })
                  : 'November 2026'}
              </span>
            </div>
          </div>
        </div>

        {/* Bio & Trust Check */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-gray-900">About Client / Organization</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {client.bio ||
                `${displayName} is an active campus buyer on UniGig, collaborating with student freelancers for coursework projects, technical solutions, and event media.`}
            </p>

            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Verified Contact Domain
              </h3>
              <p className="text-xs font-medium text-gray-700 bg-gray-50 border border-gray-100 p-3 rounded-xl inline-block">
                📧 Campus Email: <span className="font-semibold text-gray-900">{client.email}</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-gray-900">Buyer Trust Check</h2>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-center gap-2.5 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#007a4d] shrink-0" />
                <span>Verified University Campus Email</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#007a4d] shrink-0" />
                <span>Verified Escrow Payment Method</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#007a4d] shrink-0" />
                <span>Zero Payment Dispute Record</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#007a4d] shrink-0" />
                <span>Safe Peer Escrow Contract Active</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
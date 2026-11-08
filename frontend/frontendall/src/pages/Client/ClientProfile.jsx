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
  Award,
  Sparkles,
  UserCheck
} from 'lucide-react';
import API from '../../api/axios';

export default function ClientProfile() {
  const { id } = useParams();

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [clientJobs, setClientJobs] = useState([]);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Real Client Profile from Backend
        const userRes = await API.get(`/auth/user/${id}`);
        if (userRes.data?.success && userRes.data?.user) {
          setClient(userRes.data.user);
        }

        // 2. Fetch Client Reviews
        try {
          const revRes = await API.get(`/orders/reviews/client/${id}`);
          if (revRes.data?.success) {
            setReviews(revRes.data.data || []);
          }
        } catch (err) {
          console.warn('Could not fetch client reviews:', err);
        }

        // 3. Fetch Jobs posted by this Client
        try {
          const jobsRes = await API.get('/jobs');
          if (jobsRes.data?.success && Array.isArray(jobsRes.data.data)) {
            const filtered = jobsRes.data.data.filter(
              (j) => (j.client?._id || j.client?.id || j.client) === id
            );
            setClientJobs(filtered);
          }
        } catch (err) {
          console.warn('Could not fetch client jobs:', err);
        }
      } catch (err) {
        console.error('Failed to load client profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClientData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/60 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#007a4d]" />
        <p className="text-xs font-bold text-gray-500">Loading client profile...</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50/60 py-12 px-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-base font-bold text-gray-800">Client Not Found</h2>
        <p className="text-xs text-gray-500 mt-1">The requested user profile does not exist or has been removed.</p>
        <Link
          to="/stddashboard"
          className="mt-4 px-4 py-2 bg-[#007a4d] text-white rounded-xl text-xs font-bold hover:bg-[#00633e] transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const displayName = client.name || 'Campus Client';
  const displayUniversity = client.university || 'Campus Client / Organization';
  const displayFaculty = client.faculty || client.department || 'Verified Academic Client';
  const displayAvatar =
    client.avatar ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=007a4d,0284c7,4f46e5`;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) /
          reviews.length
        ).toFixed(1)
      : client.rating ? Number(client.rating).toFixed(1) : '5.0';

  const memberSince = client.createdAt
    ? new Date(client.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '2026';

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-7">

        {/* Back Link & Badge */}
        <div className="flex items-center justify-between">
          <Link
            to="/stddashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <span className="text-xs font-semibold text-[#007a4d] bg-[#eaf8f1] px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Campus Buyer</span>
          </span>
        </div>

        {/* Client Top Card */}
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
                    <span>Campus Client</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 font-medium flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#007a4d] shrink-0" />
                  <span>{displayUniversity}</span>
                </p>

                <p className="text-xs text-gray-500">
                  {displayFaculty} •{' '}
                  <span className="font-semibold text-gray-700 capitalize">{client.role || 'Client'}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 w-full md:w-auto justify-between md:justify-end">
              <div className="text-left md:text-right">
                <div className="flex items-center gap-1 text-amber-500 font-extrabold text-lg md:justify-end">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span>{averageRating}</span>
                </div>
                <p className="text-[11px] text-gray-400">({reviews.length} Student Reviews)</p>
              </div>

              {/* Message Client Action */}
              <Link
                to={`/messages?peerId=${client._id || client.id || id}`}
                className="px-5 py-2.5 bg-[#007a4d] hover:bg-[#00633e] text-white rounded-xl text-xs font-bold shadow-2xs flex items-center gap-2 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Client</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100 text-xs">
            <div>
              <span className="text-gray-400 block font-medium">Total Tasks Posted</span>
              <span className="font-extrabold text-gray-900 text-sm sm:text-base">{clientJobs.length} Tasks</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Verified Status</span>
              <span className="font-extrabold text-[#007a4d] text-sm sm:text-base">100% Verified</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Escrow Security</span>
              <span className="font-extrabold text-[#007a4d] text-sm sm:text-base">Active</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Member Since</span>
              <span className="font-extrabold text-gray-900 text-sm sm:text-base">{memberSince}</span>
            </div>
          </div>
        </div>

        {/* Bio & Trust Check */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-2xs space-y-3">
            <h2 className="text-base font-bold text-gray-900">About Client</h2>
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
                <span>Verified Campus Profile</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#007a4d] shrink-0" />
                <span>Protected Escrow Milestone Payments</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#007a4d] shrink-0" />
                <span>Direct Campus Communication Enabled</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tasks Posted by Client */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">
            Tasks Posted by {displayName}
          </h2>

          <div className="space-y-3">
            {clientJobs.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center text-xs text-gray-400">
                No open tasks currently posted by this client.
              </div>
            ) : (
              clientJobs.map((job) => (
                <div
                  key={job._id || job.id}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs hover:border-emerald-200 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-[#007a4d] bg-[#eaf8f1] px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase">
                        {job.category}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#007a4d] border border-emerald-100">
                        {job.status || 'Open'}
                      </span>
                      <span className="text-xs text-gray-400">
                        Budget: ${job.budget}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">{job.title}</h3>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Budget</span>
                      <span className="text-base font-black text-[#007a4d]">
                        ${Number(job.budget || 0).toFixed(2)}
                      </span>
                    </div>

                    <Link
                      to="/browse-jobs"
                      className="px-4 py-2 bg-[#007a4d] hover:bg-[#00633e] text-white text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Student Reviews Section */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-2xs space-y-5">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Student Freelancer Reviews
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Feedback from campus peers who completed tasks for this client.
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {reviews.length === 0 ? (
              <div className="py-6 text-center text-xs text-gray-400">
                No peer reviews recorded for this client yet.
              </div>
            ) : (
              reviews.map((fb) => (
                <div key={fb.id || fb._id} className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={fb.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${fb.reviewer || 'Student'}`}
                        alt={fb.reviewer}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-100"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">{fb.reviewer}</h4>
                        <p className="text-[10px] text-gray-400">{fb.university || 'Campus Student'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="text-xs font-bold text-gray-800">{fb.rating}.0</span>
                      <span className="text-[10px] text-gray-400 ml-1">{fb.date}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 pl-12 leading-relaxed">
                    "{fb.comment}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
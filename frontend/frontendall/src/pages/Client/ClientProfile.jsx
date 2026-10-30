import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Star,
  Briefcase,
  GraduationCap,
  Calendar,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  ArrowLeft,
  MessageSquare,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function ClientProfile() {
  const { id } = useParams();

  // Dummy Client Profile Data
  const client = {
    id: id || 'cl-101',
    name: 'Kavindu Perera',
    role: 'Club President • IEEE Student Branch',
    university: 'University of Moratuwa',
    faculty: 'Faculty of Engineering',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
    verifiedBuyer: true,
    rating: 4.9,
    reviewsCount: 16,
    totalSpent: 340.0,
    jobsPosted: 7,
    hireRate: '86%',
    memberSince: 'January 2026',
    about:
      'Coordinating tech symposiums and academic competitions for university student branches. Regularly hiring talented student developers and designers for web pages, digital art, and event media.',
    openJobs: [
      {
        id: 'JOB-102',
        title: 'Need React & Tailwind Developer for Annual Tech Fest Landing Page',
        category: 'Coding & Tech',
        budget: 50.0,
        deadline: 'Nov 05, 2026',
        proposalsCount: 6,
        status: 'Open',
      },
      {
        id: 'JOB-089',
        title: 'Event T-shirt & Badge Illustration Vector Graphics',
        category: 'Graphics & UI/UX',
        budget: 30.0,
        deadline: 'Completed',
        proposalsCount: 8,
        status: 'Completed',
      },
    ],
    studentFeedback: [
      {
        id: 1,
        studentName: 'Dulaksha Nipun',
        university: 'SEUSL',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Great client to work with! Clear requirements, provided starter files on time, and released escrow payment immediately after deliverable review.',
      },
      {
        id: 2,
        studentName: 'Sanduni Fernando',
        university: 'UoP',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: '1 month ago',
        comment: 'Prompt communication and very supportive with guidelines. Would love to collaborate on university projects again!',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Back Link */}
        <Link
          to="/browse-jobs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Task Requests</span>
        </Link>

        {/* ---------------- 1. Client Profile Header ---------------- */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={client.avatar}
                alt={client.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-[#007a4d]/10"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                    {client.name}
                  </h1>
                  {client.verifiedBuyer && (
                    <span className="inline-flex items-center gap-1 bg-[#eaf8f1] text-[#00875a] text-xs font-bold px-2.5 py-0.5 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Client</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-600 font-medium flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-emerald-700" />
                  <span>{client.university}</span>
                </p>

                <p className="text-xs text-gray-500">
                  {client.role} • {client.faculty}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-500 font-extrabold text-lg justify-end">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span>{client.rating}</span>
                </div>
                <p className="text-[11px] text-gray-400">({client.reviewsCount} Freelancer Reviews)</p>
              </div>

              <button
                type="button"
                className="px-5 py-2.5 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-2 transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Client</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100 text-xs">
            <div>
              <span className="text-gray-400 block font-medium">Total Tasks Posted</span>
              <span className="font-extrabold text-gray-900 text-base">{client.jobsPosted} Tasks</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Hire Rate</span>
              <span className="font-extrabold text-emerald-700 text-base">{client.hireRate}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Total Invested</span>
              <span className="font-extrabold text-gray-900 text-base">${client.totalSpent.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Member Since</span>
              <span className="font-extrabold text-gray-900 text-base">{client.memberSince}</span>
            </div>
          </div>
        </div>

        {/* ---------------- 2. About & Verification Details ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-sm space-y-3">
            <h2 className="text-base font-extrabold text-gray-900">About Client / Organization</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {client.about}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-3">
            <h2 className="text-base font-extrabold text-gray-900">Buyer Trust Check</h2>
            <ul className="space-y-2.5 text-xs text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified University Campus Email</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Escrow Payment Method</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% On-Time Escrow Release Rate</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------------- 3. Tasks Posted by this Client ---------------- */}
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-gray-900">
            Tasks Posted by {client.name}
          </h2>

          <div className="space-y-3">
            {client.openJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase">
                      {job.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        job.status === 'Open'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {job.status}
                    </span>
                    <span className="text-xs text-gray-400">• Deadline: {job.deadline}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{job.title}</h3>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block">Budget</span>
                    <span className="text-base font-extrabold text-[#007a4d]">
                      ${job.budget.toFixed(2)}
                    </span>
                  </div>

                  {job.status === 'Open' && (
                    <Link
                      to="/browse-jobs"
                      className="px-4 py-2 bg-[#007a4d] hover:bg-[#006640] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                    >
                      Apply / Bid
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- 4. Freelancer Feedback on this Client ---------------- */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-5">
          <div>
            <h2 className="text-base font-extrabold text-gray-900">
              Student Freelancer Reviews
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Feedback from students who completed tasks for this client.
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {client.studentFeedback.map((fb) => (
              <div key={fb.id} className="py-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={fb.avatar}
                      alt={fb.studentName}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/20"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{fb.studentName}</h4>
                      <p className="text-[10px] text-gray-400">{fb.university}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="text-xs font-bold text-gray-800">{fb.rating}.0</span>
                    <span className="text-[10px] text-gray-400 ml-1">• {fb.date}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 pl-12 leading-relaxed">
                  "{fb.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Star,
  GraduationCap,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';

export default function StudentProfile() {
  const { id } = useParams();

  // Dummy Student Public Data
  const student = {
    id: id || 'std-001',
    name: 'Dulaksha Nipun',
    university: 'South Eastern University of Sri Lanka',
    faculty: 'Faculty of Technology',
    major: 'BSc (Hons) in ICT',
    studentIdVerified: true,
    rating: 4.9,
    reviewsCount: 38,
    ordersCompleted: 42,
    memberSince: 'March 2026',
    responseTime: '< 1 Hour',
    bio: 'Passionate ICT undergraduate specializing in React, Node.js, and Networking. Experienced in delivering production-ready assignments, responsive web portals, and coursework tutoring for university peers.',
    skills: ['React.js', 'Tailwind CSS', 'Node.js', 'Express', 'Java', 'Networking (VLSM)', 'UI/UX Design'],
    gigs: [
      {
        id: 1,
        title: 'Responsive React & Tailwind Web App Development',
        category: 'Coding & Tech',
        price: 35,
        rating: 5.0,
        reviews: 24,
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop'
      },
      {
        id: 2,
        title: 'Computer Networks & Subnetting Problem Tutoring',
        category: 'Academics & Tutoring',
        price: 20,
        rating: 4.9,
        reviews: 14,
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Back Link */}
        <Link
          to="/browse"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse Gigs</span>
        </Link>

        {/* ---------------- Top Profile Header ---------------- */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                alt={student.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-[#007a4d]/10"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                    {student.name}
                  </h1>
                  {student.studentIdVerified && (
                    <span className="inline-flex items-center gap-1 bg-[#eaf8f1] text-[#00875a] text-xs font-bold px-2.5 py-0.5 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Student ID</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-600 font-medium flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-emerald-700" />
                  <span>{student.university}</span>
                </p>

                <p className="text-xs text-gray-500">
                  {student.faculty} • {student.major}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-500 font-extrabold text-lg justify-end">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span>{student.rating}</span>
                </div>
                <p className="text-[11px] text-gray-400">({student.reviewsCount} Client Reviews)</p>
              </div>

              <button
                type="button"
                className="px-5 py-2.5 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact Peer</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100 text-xs">
            <div>
              <span className="text-gray-400 block">Orders Completed</span>
              <span className="font-extrabold text-gray-900 text-base">{student.ordersCompleted} Tasks</span>
            </div>
            <div>
              <span className="text-gray-400 block">Avg Response Time</span>
              <span className="font-extrabold text-emerald-700 text-base">{student.responseTime}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Campus Member Since</span>
              <span className="font-extrabold text-gray-900 text-base">{student.memberSince}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Escrow Clearance</span>
              <span className="font-extrabold text-blue-700 text-base">100% Reliable</span>
            </div>
          </div>
        </div>

        {/* ---------------- About & Skills ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-gray-900">About Me</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {student.bio}
            </p>

            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Skills & Coursework</h3>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Verification Box */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-gray-900">Campus Verification</h2>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Student ID Verified</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Official University Email Verified</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Escrow Dispute Record</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------------- Active Gigs by this Student ---------------- */}
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-gray-900">Gigs by {student.name}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {student.gigs.map((gig) => (
              <div
                key={gig.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:border-[#007a4d]/30 transition-all flex flex-col justify-between"
              >
                <img src={gig.image} alt={gig.title} className="w-full h-40 object-cover" />
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {gig.category}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 mt-2 line-clamp-2">
                      {gig.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">Starting at</span>
                    <span className="text-base font-extrabold text-[#007a4d]">${gig.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
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
  ExternalLink,
  Award,
  Layers
} from 'lucide-react';

export default function StudentProfile() {
  const { id } = useParams();

  const studentsDb = {
    'std-001': {
      id: 'std-001',
      name: 'Dulaksha Nipun',
      university: 'South Eastern University of Sri Lanka',
      faculty: 'Faculty of Technology',
      major: 'BSc (Hons) in ICT',
      studentReg: 'SEU/IS/22/ICT/047',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      studentIdVerified: true,
      rating: 4.9,
      reviewsCount: 38,
      ordersCompleted: 42,
      memberSince: 'March 2026',
      responseTime: '< 1 Hour',
      bio: 'Passionate ICT undergraduate specializing in React, Node.js, and Networking. Experienced in delivering clean code assignments, responsive web portals, and peer coursework tutoring.',
      skills: ['React.js', 'Tailwind CSS', 'Node.js', 'Java', 'Networking (VLSM)', 'UI/UX Design'],
      gigs: [
        {
          id: 1,
          title: 'Responsive React & Tailwind Web App Development and Bug Fixing',
          category: 'Coding & Tech',
          price: 35,
          rating: 5.0,
          reviews: 94,
          delivery: '2 Days',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format&fit=crop'
        }
      ]
    },
    'std-002': {
      id: 'std-002',
      name: 'Sanduni Fernando',
      university: 'University of Peradeniya',
      faculty: 'Faculty of Engineering',
      major: 'Computer Engineering',
      studentReg: 'UOP/ENG/22/104',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      studentIdVerified: true,
      rating: 5.0,
      reviewsCount: 19,
      ordersCompleted: 26,
      memberSince: 'February 2026',
      responseTime: '< 30 Mins',
      bio: 'Computer Engineering undergraduate offering 1-on-1 tutoring in Java OOP, Data Structures, Algorithms, and debugging complex runtime errors.',
      skills: ['Java', 'OOP', 'Data Structures & Algorithms', 'C++', 'Python'],
      gigs: [
        {
          id: 2,
          title: 'Object-Oriented Programming (Java) & DSA Tutoring',
          category: 'Academics & Tutoring',
          price: 20,
          rating: 4.9,
          reviews: 128,
          delivery: '1 Day',
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=500&auto=format&fit=crop'
        }
      ]
    },
    'std-003': {
      id: 'std-003',
      name: 'Kavindu Perera',
      university: 'University of Moratuwa',
      faculty: 'Faculty of Information Technology',
      major: 'BSc (Hons) in IT & Management',
      studentReg: 'UOM/IT/23/089',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      studentIdVerified: true,
      rating: 4.8,
      reviewsCount: 27,
      ordersCompleted: 35,
      memberSince: 'January 2026',
      responseTime: '< 2 Hours',
      bio: 'Creative designer specializing in university event branding, club t-shirts, modern social media banners, and print-ready vector emblems.',
      skills: ['Adobe Illustrator', 'Photoshop', 'Vector Art', 'Branding', 'Figma'],
      gigs: [
        {
          id: 3,
          title: 'Minimalist Club Event Posters & Vector Badges',
          category: 'Graphics & UI/UX',
          price: 15,
          rating: 4.8,
          reviews: 67,
          delivery: '1 Day',
          image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=500&auto=format&fit=crop'
        }
      ]
    }
  };

  const student = studentsDb[id] || studentsDb['std-001'];

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-7">

        <div className="flex items-center justify-between">
          <Link
            to="/browse"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Browse Gigs</span>
          </Link>
          <span className="text-xs font-semibold text-[#007a4d] bg-[#eaf8f1] px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Campus Verified Freelancer</span>
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-2xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-[#007a4d]/10 shrink-0"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                    {student.name}
                  </h1>
                  {student.studentIdVerified && (
                    <span className="inline-flex items-center gap-1 bg-[#eaf8f1] border border-emerald-100 text-[#007a4d] text-xs font-bold px-2.5 py-0.5 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Student ID</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 font-medium flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#007a4d] shrink-0" />
                  <span>{student.university}</span>
                </p>

                <p className="text-xs text-gray-500">
                  {student.faculty} • <span className="font-semibold text-gray-700">{student.major}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 w-full md:w-auto justify-between md:justify-end">
              <div className="text-left md:text-right">
                <div className="flex items-center gap-1 text-amber-500 font-extrabold text-lg md:justify-end">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span>{student.rating}</span>
                </div>
                <p className="text-[11px] text-gray-400">({student.reviewsCount} Client Reviews)</p>
              </div>

              <Link
                to={`/messages?peerId=${student.id}`}
                className="px-5 py-2.5 bg-[#007a4d] hover:bg-[#00633e] text-white rounded-xl text-xs font-bold shadow-2xs flex items-center gap-2 active:scale-95 transition-all whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact Peer</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100 text-xs">
            <div>
              <span className="text-gray-400 block">Orders Completed</span>
              <span className="font-extrabold text-gray-900 text-sm sm:text-base">{student.ordersCompleted} Tasks</span>
            </div>
            <div>
              <span className="text-gray-400 block">Avg Response Time</span>
              <span className="font-extrabold text-[#007a4d] text-sm sm:text-base">{student.responseTime}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Campus Member Since</span>
              <span className="font-extrabold text-gray-900 text-sm sm:text-base">{student.memberSince}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Escrow Clearance</span>
              <span className="font-extrabold text-blue-700 text-sm sm:text-base">100% Reliable</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-gray-900">About Me</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {student.bio}
            </p>

            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Skills & Coursework
              </h3>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill, idx) => (
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
                <span>Official University Email Verified</span>
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

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Active Campus Gigs by {student.name}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {student.gigs.map((gig) => (
              <div
                key={gig.id}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-2xs hover:border-emerald-200 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-gray-100">
                    <img src={gig.image} alt={gig.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-[#eaf8f1] border border-emerald-100 text-[#007a4d] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {gig.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">
                      {gig.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-extrabold text-gray-800">{gig.rating}</span>
                        <span className="text-[11px] text-gray-400">({gig.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400">
                        <Clock className="w-3.5 h-3.5 text-[#007a4d]" />
                        <span>{gig.delivery}</span>
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
                    to="/browse"
                    className="inline-flex items-center gap-1 px-3.5 py-2 bg-white hover:bg-[#007a4d] hover:text-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all shadow-2xs"
                  >
                    <span>View Service</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Users,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  FileText,
  Star,
  ArrowUpRight
} from 'lucide-react';

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('overview'); // overview, jobs, orders

  // Dummy Client Profile Data
  const client = {
    name: 'Kavindu Perera',
    role: 'Club President • IEEE Student Branch',
    university: 'University of Moratuwa',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
    activeHires: 3,
    totalSpent: 320.0,
    inEscrow: 65.0,
  };

  // Dummy Job Requests posted by Client (Reverse Bidding Flow)
  const myJobPosts = [
    {
      id: 'JOB-102',
      title: 'Need React & Tailwind Developer for Annual Tech Fest Landing Page',
      category: 'Coding & Tech',
      budget: 50.0,
      deadline: 'Nov 05, 2026',
      status: 'Open',
      proposalsCount: 6,
      postedDate: 'Yesterday',
    },
    {
      id: 'JOB-098',
      title: 'Looking for a peer tutor for Data Structures & Algorithms (Trees & Graphs)',
      category: 'Academics & Tutoring',
      budget: 25.0,
      deadline: 'Oct 30, 2026',
      status: 'Hired',
      proposalsCount: 4,
      postedDate: '3 days ago',
    },
    {
      id: 'JOB-089',
      title: 'Event T-shirt & Badge Illustration Vector Graphics',
      category: 'Graphics & UI/UX',
      budget: 30.0,
      deadline: 'Oct 20, 2026',
      status: 'Completed',
      proposalsCount: 8,
      postedDate: '2 weeks ago',
    },
  ];

  // Active / Ongoing Hired Orders
  const hiredOrders = [
    {
      id: 'ORD-9477',
      serviceTitle: 'Responsive React & Tailwind Web App Development',
      student: {
        name: 'Dulaksha Nipun',
        university: 'SEUSL',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      },
      amount: 35.0,
      deadline: 'Tomorrow, 6:00 PM',
      status: 'Delivered', // Review Pending
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'ORD-9482',
      serviceTitle: 'DSA Trees & Graphs Mid-Term Problem Solving Session',
      student: {
        name: 'Sanduni Fernando',
        university: 'UoP',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      },
      amount: 25.0,
      deadline: 'Oct 30, 2026',
      status: 'In Progress',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ---------------- 1. Top Client Header ---------------- */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src={client.avatar}
              alt={client.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-[#007a4d]/10"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                  {client.name}
                </h1>
                <span className="inline-flex items-center gap-1 bg-[#eaf8f1] text-[#00875a] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Buyer</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {client.role} • <span className="text-gray-700 font-medium">{client.university}</span>
              </p>
              <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                ● Client Account Mode
              </p>
            </div>
          </div>

          {/* Post a Task / Job Button */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/post-job"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-[#007a4d] hover:bg-[#006640] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Post a Job Request</span>
            </Link>
          </div>
        </div>

        {/* ---------------- 2. Metrics Grid ---------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Escrow Balance</p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">${client.inEscrow.toFixed(2)}</h3>
              <span className="text-[11px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" /> Locked until approval
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Tasks Hired</p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{client.activeHires}</h3>
              <span className="text-[11px] text-gray-500 mt-1 block">Students currently working</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Open Job Posts</p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">1</h3>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">6 proposals received</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#007a4d] flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Invested</p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">${client.totalSpent.toFixed(2)}</h3>
              <span className="text-[11px] text-gray-500 mt-1 block">Across completed tasks</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* ---------------- 3. Tab Navigation ---------------- */}
        <div className="flex border-b border-gray-200 gap-6 text-sm font-semibold">
          {[
            { id: 'overview', label: 'Deliverables & Approvals' },
            { id: 'jobs', label: 'My Posted Job Requests' },
            { id: 'orders', label: 'All Hires & History' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[#007a4d] border-b-2 border-[#007a4d]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ---------------- 4. Tab Content Area ---------------- */}

        {/* Tab 1: Overview & Deliverables for Approval */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Urgent Deliverables Notification */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></span>
                    <span>Submissions Awaiting Your Review</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Student freelancers have submitted their project deliverables. Review and approve release of escrow payment.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {hiredOrders
                  .filter((o) => o.status === 'Delivered')
                  .map((order) => (
                    <div key={order.id} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.student.avatar}
                          alt={order.student.name}
                          className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500/20"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-gray-400">{order.id}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                              Delivered
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900">{order.serviceTitle}</h4>
                          <p className="text-xs text-gray-500">
                            Student: <strong className="text-gray-800">{order.student.name}</strong> ({order.student.university})
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <button
                          type="button"
                          className="flex-1 md:flex-none px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors"
                        >
                          Request Revision
                        </button>
                        <button
                          type="button"
                          onClick={() => alert(`Escrow payment of $${order.amount} approved for ${order.student.name}!`)}
                          className="flex-1 md:flex-none px-4 py-2 bg-[#007a4d] hover:bg-[#006640] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                        >
                          Approve & Release (${order.amount})
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: My Posted Job Requests (Reverse Bidding Flow) */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">Active Job Postings</h3>
                <p className="text-xs text-gray-500 mt-0.5">Tasks you posted for university peers to bid on</p>
              </div>
              <Link
                to="/post-job"
                className="inline-flex items-center gap-1.5 bg-[#007a4d] hover:bg-[#006640] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Job</span>
              </Link>
            </div>

            <div className="divide-y divide-gray-100">
              {myJobPosts.map((job) => (
                <div key={job.id} className="py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {job.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        job.status === 'Open'
                          ? 'bg-green-100 text-green-800'
                          : job.status === 'Hired'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {job.status}
                      </span>
                      <span className="text-xs text-gray-400">• Posted {job.postedDate}</span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900">{job.title}</h4>
                    <p className="text-xs text-gray-500">
                      Budget: <strong className="text-gray-900">${job.budget}</strong> • Deadline: {job.deadline}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="block font-bold text-emerald-700 text-sm">
                        {job.proposalsCount} Proposals
                      </span>
                      <span className="text-[10px] text-gray-400">Student Bids</span>
                    </div>
                    <button
                      type="button"
                      className="px-3.5 py-1.5 border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
                    >
                      View Bids
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Complete Hired Orders History */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-extrabold text-gray-900 mb-6">Complete Contract Records</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 uppercase tracking-wider font-bold">
                    <th className="pb-3">Contract ID</th>
                    <th className="pb-3">Task Details</th>
                    <th className="pb-3">Hired Student</th>
                    <th className="pb-3">Budget</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {hiredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50/50">
                      <td className="py-4 font-mono font-bold text-gray-900">{ord.id}</td>
                      <td className="py-4 font-semibold text-gray-900">{ord.serviceTitle}</td>
                      <td className="py-4 text-gray-600">{ord.student.name}</td>
                      <td className="py-4 font-bold text-[#007a4d]">${ord.amount.toFixed(2)}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${ord.statusColor}`}>
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
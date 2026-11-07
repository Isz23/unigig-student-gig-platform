import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  Lock,
  Layers,
  ChevronRight,
  RefreshCw,
  FileText
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('verifications'); // 'verifications' | 'disputes' | 'moderation'

  // 1. Pending Student Verifications
  const [pendingVerifications, setPendingVerifications] = useState([
    {
      id: 'VERIF-201',
      name: 'Dulaksha Nipun',
      university: 'South Eastern University of Sri Lanka',
      regNumber: 'SEU/IS/22/ICT/047',
      faculty: 'Faculty of Technology',
      idCardImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=300&auto=format&fit=crop',
      submittedDate: 'Nov 02, 2026',
      email: 'seu22ict047@seu.ac.lk'
    },
    {
      id: 'VERIF-202',
      name: 'Sanduni Fernando',
      university: 'University of Peradeniya',
      regNumber: 'UOP/ENG/22/104',
      faculty: 'Faculty of Engineering',
      idCardImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=300&auto=format&fit=crop',
      submittedDate: 'Nov 01, 2026',
      email: 'eng22104@eng.pdn.ac.lk'
    }
  ]);

  // 2. Escrow Disputes
  const [disputes, setDisputes] = useState([
    {
      id: 'DISP-901',
      orderId: 'ORD-9477',
      title: 'Responsive React & Tailwind Web App',
      clientName: 'Kavindu Perera (UoM)',
      freelancerName: 'Dulaksha Nipun (SEUSL)',
      amount: 35.0,
      reason: 'Client claims the mobile navbar menu does not toggle smoothly.',
      submittedDate: 'Oct 31, 2026',
      status: 'Under Review'
    }
  ]);

  // Modals / Inspect States
  const [inspectStudent, setInspectStudent] = useState(null);

  const handleApproveStudent = (id) => {
    setPendingVerifications((prev) => prev.filter((item) => item.id !== id));
    setInspectStudent(null);
  };

  const handleRejectStudent = (id) => {
    setPendingVerifications((prev) => prev.filter((item) => item.id !== id));
    setInspectStudent(null);
  };

  const handleResolveDispute = (dispId, action) => {
    setDisputes((prev) => prev.filter((d) => d.id !== dispId));
  };

  return (
    <div className="min-h-screen bg-gray-50/70 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-7">

        {/* ---------------- Admin Header ---------------- */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-100">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Campus Trust & Safety Panel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              UniGig Super Admin Hub
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl leading-relaxed">
              Verify university credentials, resolve milestone escrow payment disputes, and monitor marketplace activities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
              Campus Admin: <strong className="text-gray-900">Root Access</strong>
            </span>
          </div>
        </div>

        {/* ---------------- Key Metric Cards ---------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending KYC</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">{pendingVerifications.length} Students</h3>
              <span className="text-[11px] text-amber-600 font-semibold block mt-1">Requires review</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Disputes</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">{disputes.length} Cases</h3>
              <span className="text-[11px] text-red-600 font-semibold block mt-1">Funds held in Escrow</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Vault Escrow</p>
              <h3 className="text-2xl font-black text-[#007a4d] mt-1">$1,420.00</h3>
              <span className="text-[11px] text-[#007a4d] font-semibold block mt-1">Guaranteed student balance</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#eaf8f1] text-[#007a4d] flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Verified Peers</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">128 Students</h3>
              <span className="text-[11px] text-emerald-600 font-semibold block mt-1">Across 8 Universities</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#007a4d] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* ---------------- Navigation Tabs ---------------- */}
        <div className="flex border-b border-gray-200 gap-6 text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('verifications')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'verifications' ? 'text-[#007a4d]' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <span>Student ID Verifications ({pendingVerifications.length})</span>
            {activeTab === 'verifications' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007a4d]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('disputes')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'disputes' ? 'text-[#007a4d]' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <span>Escrow Disputes ({disputes.length})</span>
            {disputes.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
            {activeTab === 'disputes' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007a4d]" />
            )}
          </button>
        </div>

        {/* ---------------- Tab 1: Pending Student Verifications ---------------- */}
        {activeTab === 'verifications' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-2xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-gray-900">Pending Student Identity Approvals</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Inspect official university registration cards and `.ac.lk` email proofs before granting marketplace privileges.
              </p>
            </div>

            {pendingVerifications.length === 0 ? (
              <div className="text-center py-12 text-xs text-gray-400 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <p>All student verification submissions have been cleared!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 uppercase tracking-wider font-bold">
                      <th className="pb-3">Student Name</th>
                      <th className="pb-3">University & Faculty</th>
                      <th className="pb-3">Registration Number</th>
                      <th className="pb-3">Email Domain</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                    {pendingVerifications.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="py-4 font-bold text-gray-900">{item.name}</td>
                        <td className="py-4 text-gray-600">
                          <div>{item.university}</div>
                          <div className="text-[11px] text-gray-400">{item.faculty}</div>
                        </td>
                        <td className="py-4 font-mono font-semibold text-gray-800">{item.regNumber}</td>
                        <td className="py-4 text-gray-500 font-mono">{item.email}</td>
                        <td className="py-4 text-right">
                          <button
                            type="button"
                            onClick={() => setInspectStudent(item)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#eaf8f1] hover:bg-emerald-100 text-[#007a4d] rounded-xl font-bold transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Inspect ID</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ---------------- Tab 2: Escrow Disputes ---------------- */}
        {activeTab === 'disputes' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-2xs space-y-5">
            <div>
              <h2 className="text-base font-bold text-gray-900">Active Milestone Escrow Disputes</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Review deliverables, peer chat logs, and order terms to safely release or refund held escrow funds.
              </p>
            </div>

            {disputes.length === 0 ? (
              <div className="text-center py-12 text-xs text-gray-400 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <p>No active disputes! All campus transactions are in good standing.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {disputes.map((disp) => (
                  <div
                    key={disp.id}
                    className="p-5 sm:p-6 rounded-2xl border border-red-100 bg-red-50/20 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-red-600">{disp.id}</span>
                          <span className="text-xs font-mono font-bold text-gray-400">({disp.orderId})</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                            {disp.status}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 mt-1">{disp.title}</h3>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-xs text-gray-400">Held in Escrow</span>
                        <h4 className="text-lg font-black text-[#007a4d]">${disp.amount.toFixed(2)}</h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600">
                      <div>
                        <p><strong className="text-gray-900">Client:</strong> {disp.clientName}</p>
                        <p><strong className="text-gray-900">Student Freelancer:</strong> {disp.freelancerName}</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-200/80">
                        <span className="font-bold text-gray-900 block mb-0.5">Dispute Reason:</span>
                        <p className="italic text-gray-600">{disp.reason}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <Link
                        to="/messages"
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-bold transition-all"
                      >
                        Inspect Chat Logs
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleResolveDispute(disp.id, 'refund')}
                        className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition-all"
                      >
                        Refund Client ($35)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleResolveDispute(disp.id, 'release')}
                        className="px-5 py-2 bg-[#007a4d] hover:bg-[#00633e] text-white rounded-xl text-xs font-bold shadow-2xs transition-all"
                      >
                        Release to Student ($35)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ---------------- Inspect Student Verification Modal ---------------- */}
      {inspectStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-gray-100 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">Inspect Student Credentials</h3>
                <p className="text-xs text-gray-500">{inspectStudent.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setInspectStudent(null)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <div>
                  <span className="text-gray-400 block font-medium">Full Name</span>
                  <strong className="text-gray-900 text-sm">{inspectStudent.name}</strong>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Student Registration</span>
                  <strong className="text-gray-900 text-sm font-mono">{inspectStudent.regNumber}</strong>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-400 block font-medium">University Domain</span>
                  <strong className="text-emerald-700 font-mono">{inspectStudent.email}</strong>
                </div>
              </div>

              <div>
                <span className="text-gray-400 block font-bold uppercase tracking-wider mb-1.5">
                  Uploaded Student ID Card Preview
                </span>
                <div className="rounded-2xl overflow-hidden border border-gray-200 aspect-[16/10] bg-gray-100 shadow-inner">
                  <img
                    src={inspectStudent.idCardImage}
                    alt="University Student ID"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => handleRejectStudent(inspectStudent.id)}
                className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition-all"
              >
                Reject & Request Re-upload
              </button>
              <button
                type="button"
                onClick={() => handleApproveStudent(inspectStudent.id)}
                className="px-5 py-2.5 bg-[#007a4d] hover:bg-[#00633e] text-white rounded-xl text-xs font-bold shadow-2xs transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve Verified Badge</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
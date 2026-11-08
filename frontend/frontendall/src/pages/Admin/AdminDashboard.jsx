import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  GraduationCap,
  Briefcase,
  LogOut,
  Trash2,
  Edit,
  DollarSign,
  Search,
  CheckCircle2,
  XCircle,
  Loader2,
  Layers,
  Save,
  X,
  Eye,
  Star,
  UserCheck,
  Calendar,
  Mail,
  Building2,
  FileText
} from 'lucide-react';
import API from '../../api/axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [inspectUser, setInspectUser] = useState(null); // Expand Details & Reviews
  const [editingUser, setEditingUser] = useState(null);
  const [viewingItemsUser, setViewingItemsUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Authentication check
  useEffect(() => {
    try {
      const stored = localStorage.getItem('user') || localStorage.getItem('userInfo');
      const user = stored ? JSON.parse(stored) : null;
      if (!user || (user.role || '').toLowerCase() !== 'admin') {
        navigate('/login');
      }
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [stdRes, clientRes] = await Promise.all([
        API.get('/admin/students'),
        API.get('/admin/clients')
      ]);
      if (stdRes.data?.success) setStudents(stdRes.data.data);
      if (clientRes.data?.success) setClients(clientRes.data.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.clear();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // 1. Verify or Revoke Student Action
  const handleVerifyStudent = async (userId, status) => {
    try {
      setActionLoading(true);
      const res = await API.put(`/admin/users/${userId}/verify`, { status });
      if (res.data?.success) {
        setStudents((prev) =>
          prev.map((s) =>
            s._id === userId
              ? { ...s, verificationStatus: status, isVerifiedStudent: status === 'verified' }
              : s
          )
        );
        if (inspectUser && inspectUser._id === userId) {
          setInspectUser((prev) => ({
            ...prev,
            verificationStatus: status,
            isVerifiedStudent: status === 'verified'
          }));
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Verification update failed');
    } finally {
      setActionLoading(false);
    }
  };

  // 2. Delete User
  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to completely delete "${userName}" and all records?`)) return;
    try {
      await API.delete(`/admin/users/${userId}`);
      setStudents((prev) => prev.filter((u) => u._id !== userId));
      setClients((prev) => prev.filter((u) => u._id !== userId));
      if (inspectUser?._id === userId) setInspectUser(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  // 3. Delete Gig
  const handleDeleteGig = async (gigId) => {
    if (!window.confirm('Delete this gig from platform?')) return;
    try {
      await API.delete(`/admin/gigs/${gigId}`);
      setViewingItemsUser((prev) => ({
        ...prev,
        gigs: prev.gigs.filter((g) => g._id !== gigId)
      }));
      setStudents((prev) =>
        prev.map((s) =>
          s._id === viewingItemsUser._id
            ? { ...s, gigs: s.gigs.filter((g) => g._id !== gigId) }
            : s
        )
      );
    } catch (err) {
      alert('Failed to delete gig');
    }
  };

  // 4. Delete Job
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Delete this client job post?')) return;
    try {
      await API.delete(`/admin/jobs/${jobId}`);
      setViewingItemsUser((prev) => ({
        ...prev,
        jobs: prev.jobs.filter((j) => j._id !== jobId)
      }));
      setClients((prev) =>
        prev.map((c) =>
          c._id === viewingItemsUser._id
            ? { ...c, jobs: c.jobs.filter((j) => j._id !== jobId) }
            : c
        )
      );
    } catch (err) {
      alert('Failed to delete job');
    }
  };

  // 5. Save Edit User
  const handleSaveUser = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      const res = await API.put(`/admin/users/${editingUser._id}`, editingUser);
      if (res.data?.success) {
        const updated = res.data.user;
        setStudents((prev) => prev.map((s) => (s._id === updated._id ? { ...s, ...updated } : s)));
        setClients((prev) => prev.map((c) => (c._id === updated._id ? { ...c, ...updated } : c)));
        setEditingUser(null);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentRegNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredClients = clients.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100/70 font-sans text-gray-800">

      {/* TOP ADMIN BAR */}
      <header className="bg-gray-900 text-white sticky top-0 z-40 px-6 py-3.5 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#007a4d] flex items-center justify-center font-black text-white text-base">
            U
          </div>
          <h1 className="text-sm font-extrabold tracking-wide uppercase text-gray-100 flex items-center gap-2">
            UniGig Control Center
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
              MASTER ADMIN
            </span>
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

        {/* Tab & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setActiveTab('students'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'students'
                  ? 'bg-[#007a4d] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Management ({students.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('clients'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'clients'
                  ? 'bg-[#007a4d] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Client Management ({clients.length})</span>
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#007a4d]"
            />
          </div>
        </div>

        {/* LOADING INDICATOR */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-[#007a4d]" />
            <p className="text-xs text-gray-500 font-semibold">Loading data...</p>
          </div>
        ) : (
          <>
            {/* 1. STUDENT SECTION */}
            {activeTab === 'students' && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Registered Campus Students
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50/80 text-gray-500 uppercase text-[10px] border-b border-gray-100">
                      <tr>
                        <th className="p-3.5">Student Details</th>
                        <th className="p-3.5">University & Reg No</th>
                        <th className="p-3.5">Verification</th>
                        <th className="p-3.5">Wallet Balance</th>
                        <th className="p-3.5">Gigs & Orders</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((std) => (
                          <tr key={std._id} className="hover:bg-gray-50/50">
                            <td className="p-3.5">
                              <div className="font-bold text-gray-900">{std.name}</div>
                              <div className="text-[11px] text-gray-400">{std.email}</div>
                            </td>
                            <td className="p-3.5">
                              <span className="font-mono text-[#007a4d] font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                {std.studentRegNumber || 'No Reg'}
                              </span>
                              <div className="text-[10px] text-gray-500 mt-0.5">{std.university}</div>
                            </td>
                            <td className="p-3.5">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  std.verificationStatus === 'verified'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {std.verificationStatus || 'pending'}
                                </span>

                                {std.verificationStatus !== 'verified' ? (
                                  <button
                                    onClick={() => handleVerifyStudent(std._id, 'verified')}
                                    disabled={actionLoading}
                                    title="Quick Verify Student"
                                    className="p-1 text-emerald-600 hover:bg-emerald-50 rounded border border-emerald-200 cursor-pointer text-[10px] font-bold flex items-center gap-1"
                                  >
                                    <UserCheck className="w-3.5 h-3.5" />
                                    <span>Verify</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleVerifyStudent(std._id, 'pending')}
                                    disabled={actionLoading}
                                    title="Revoke Verification"
                                    className="p-1 text-gray-400 hover:text-amber-600 rounded cursor-pointer text-[10px]"
                                  >
                                    Revoke
                                  </button>
                                )}
                              </div>
                            </td>
                            <td className="p-3.5 font-bold text-gray-900 text-sm">
                              ${Number(std.walletBalance || 0).toFixed(2)}
                            </td>
                            <td className="p-3.5">
                              <button
                                onClick={() => setViewingItemsUser(std)}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-[11px] cursor-pointer"
                              >
                                <Layers className="w-3.5 h-3.5 text-blue-600" />
                                <span>{std.gigs?.length || 0} Gigs</span>
                                <span className="text-gray-400">| {std.ordersCount || 0} Orders</span>
                              </button>
                            </td>
                            <td className="p-3.5 text-right space-x-1">
                              {/* INSPECT DETAILS & REVIEWS BUTTON */}
                              <button
                                onClick={() => setInspectUser(std)}
                                className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg cursor-pointer"
                                title="Expand Details & Client Reviews"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingUser(std)}
                                className="p-1.5 text-gray-600 hover:text-[#007a4d] hover:bg-emerald-50 rounded-lg cursor-pointer"
                                title="Edit Student & Wallet"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(std._id, std.name)}
                                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer"
                                title="Delete Student"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="py-8 text-center text-gray-400">
                            No students found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2. CLIENT SECTION */}
            {activeTab === 'clients' && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Registered Clients
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50/80 text-gray-500 uppercase text-[10px] border-b border-gray-100">
                      <tr>
                        <th className="p-3.5">Client Details</th>
                        <th className="p-3.5">Role / University</th>
                        <th className="p-3.5">Escrow Wallet Balance</th>
                        <th className="p-3.5">Posted Tasks & Orders</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredClients.length > 0 ? (
                        filteredClients.map((client) => (
                          <tr key={client._id} className="hover:bg-gray-50/50">
                            <td className="p-3.5">
                              <div className="font-bold text-gray-900">{client.name}</div>
                              <div className="text-[11px] text-gray-400">{client.email}</div>
                            </td>
                            <td className="p-3.5 text-gray-600">
                              <span className="capitalize px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                                {client.role}
                              </span>
                              <div className="text-[10px] text-gray-400 mt-0.5">{client.university || 'General Client'}</div>
                            </td>
                            <td className="p-3.5 font-bold text-[#007a4d] text-sm">
                              ${Number(client.walletBalance || 0).toFixed(2)}
                            </td>
                            <td className="p-3.5">
                              <button
                                onClick={() => setViewingItemsUser(client)}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-[11px] cursor-pointer"
                              >
                                <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{client.jobs?.length || 0} Posted Tasks</span>
                                <span className="text-gray-400">| {client.ordersCount || 0} Orders</span>
                              </button>
                            </td>
                            <td className="p-3.5 text-right space-x-1">
                              {/* INSPECT DETAILS & STUDENT REVIEWS BUTTON */}
                              <button
                                onClick={() => setInspectUser(client)}
                                className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg cursor-pointer"
                                title="Expand Details & Student Reviews"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingUser(client)}
                                className="p-1.5 text-gray-600 hover:text-[#007a4d] hover:bg-emerald-50 rounded-lg cursor-pointer"
                                title="Edit Client & Wallet"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(client._id, client.name)}
                                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer"
                                title="Delete Client"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="py-8 text-center text-gray-400">
                            No clients found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

      </main>

      {/* MODAL 1: EXPAND USER DETAILS & REVIEWS INSPECTOR */}
      {inspectUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#007a4d] font-black flex items-center justify-center text-base">
                  {inspectUser.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    {inspectUser.name}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 uppercase text-gray-600">
                      {inspectUser.role}
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-400">{inspectUser.email}</p>
                </div>
              </div>

              <button
                onClick={() => setInspectUser(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Meta Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-400 block font-medium">Campus / University</span>
                <span className="font-bold text-gray-800 truncate block mt-0.5">{inspectUser.university || 'SEUSL'}</span>
              </div>

              {inspectUser.role === 'student' && (
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 block font-medium">Student Reg Number</span>
                  <span className="font-mono font-bold text-[#007a4d] block mt-0.5">
                    {inspectUser.studentRegNumber || 'Not provided'}
                  </span>
                </div>
              )}

              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-400 block font-medium">Wallet Balance</span>
                <span className="font-bold text-[#007a4d] text-sm block mt-0.5">
                  ${Number(inspectUser.walletBalance || 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Verification Status Banner with One-Click Verify */}
            {inspectUser.role === 'student' && (
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900">Campus Verification Status:</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      inspectUser.verificationStatus === 'verified'
                        ? 'bg-emerald-200 text-emerald-800'
                        : 'bg-amber-200 text-amber-800'
                    }`}>
                      {inspectUser.verificationStatus || 'pending'}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Verifying grants the student the official Campus Verified badge and sends a real-time notification.
                  </p>
                </div>

                {inspectUser.verificationStatus !== 'verified' ? (
                  <button
                    onClick={() => handleVerifyStudent(inspectUser._id, 'verified')}
                    disabled={actionLoading}
                    className="px-4 py-2 bg-[#007a4d] hover:bg-[#00633e] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Verify</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleVerifyStudent(inspectUser._id, 'pending')}
                    disabled={actionLoading}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold border border-rose-200 cursor-pointer shrink-0"
                  >
                    Revoke Status
                  </button>
                )}
              </div>
            )}

            {/* REVIEWS SECTION */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Reviews & Feedback Received ({inspectUser.reviews?.length || 0})</span>
                </h4>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {inspectUser.reviews && inspectUser.reviews.length > 0 ? (
                  inspectUser.reviews.map((rev) => (
                    <div key={rev.id} className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-gray-800 flex items-center gap-1.5">
                          <span>{rev.reviewerName}</span>
                          {rev.studentRegNumber && (
                            <span className="text-[10px] font-mono text-gray-400">({rev.studentRegNumber})</span>
                          )}
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                          <span>{rev.rating}</span>
                          <Star className="w-3 h-3 fill-amber-400" />
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-600 leading-relaxed italic">
                        "{rev.comment || 'No written feedback provided.'}"
                      </p>
                      <div className="text-[10px] text-gray-400">
                        {new Date(rev.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-xs text-gray-400 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                    No reviews received by this {inspectUser.role} yet.
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-gray-100">
              <button
                onClick={() => setInspectUser(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT USER & WALLET */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">
                Edit {editingUser.role === 'student' ? 'Student' : 'Client'} Details
              </h3>
              <button onClick={() => setEditingUser(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingUser.name || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Email</label>
                <input
                  type="email"
                  value={editingUser.email || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Wallet Money ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingUser.walletBalance ?? 0}
                  onChange={(e) => setEditingUser({ ...editingUser, walletBalance: e.target.value })}
                  className="w-full px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl font-bold text-[#007a4d]"
                  required
                />
              </div>

              {editingUser.role === 'student' && (
                <>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Student Reg Number</label>
                    <input
                      type="text"
                      value={editingUser.studentRegNumber || ''}
                      onChange={(e) => setEditingUser({ ...editingUser, studentRegNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Verification Status</label>
                    <select
                      value={editingUser.verificationStatus || 'pending'}
                      onChange={(e) => setEditingUser({ ...editingUser, verificationStatus: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                    >
                      <option value="pending">Pending</option>
                      <option value="verified">Verified</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 bg-[#007a4d] hover:bg-[#00633e] text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: VIEW & DELETE GIGS OR CLIENT JOBS */}
      {viewingItemsUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">
                {viewingItemsUser.role === 'student'
                  ? `Active Gigs by ${viewingItemsUser.name}`
                  : `Posted Tasks by ${viewingItemsUser.name}`}
              </h3>
              <button onClick={() => setViewingItemsUser(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2">
              {viewingItemsUser.role === 'student' ? (
                viewingItemsUser.gigs?.length > 0 ? (
                  viewingItemsUser.gigs.map((g) => (
                    <div key={g._id} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">{g.title}</h4>
                        <div className="text-[10px] text-gray-400">
                          Category: {g.category} • Price: ${g.price} • Rating: {g.rating || 5}⭐
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteGig(g._id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg cursor-pointer"
                        title="Delete this gig"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 py-6 text-center">No gigs posted by this student yet.</p>
                )
              ) : (
                viewingItemsUser.jobs?.length > 0 ? (
                  viewingItemsUser.jobs.map((j) => (
                    <div key={j._id} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">{j.title}</h4>
                        <div className="text-[10px] text-gray-400">
                          Budget: ${j.budget} • Status: {j.status} • Bids: {j.proposals?.length || 0}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteJob(j._id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg cursor-pointer"
                        title="Delete this task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 py-6 text-center">No tasks posted by this client yet.</p>
                )
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setViewingItemsUser(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
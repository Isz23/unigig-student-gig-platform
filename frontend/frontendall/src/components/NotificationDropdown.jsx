import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  Briefcase,
  DollarSign,
  MessageSquare,
  Sparkles,
  FileCheck2,
  Clock
} from 'lucide-react';

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const isClientRole =
    location.pathname.startsWith('/clientdashboard') ||
    location.pathname.startsWith('/post-job');

  const studentNotifications = [
    {
      id: 'NOTIF-S1',
      type: 'bid_accepted',
      title: 'Proposal Accepted! 🎉',
      message: 'Client Kavindu Perera accepted your bid for "React & Tailwind Landing Page". $35 locked in Escrow.',
      createdDate: '10 mins ago',
      readStatus: false,
      targetLink: '/stddashboard'
    },
    {
      id: 'NOTIF-S2',
      type: 'payment_released',
      title: 'Payment Released 💰',
      message: 'Escrow payment of $25.00 has been released to your student wallet for completed order ORD-8812.',
      createdDate: '2 hours ago',
      readStatus: false,
      targetLink: '/stddashboard'
    },
    {
      id: 'NOTIF-S3',
      type: 'new_message',
      title: 'New Campus Message',
      message: 'Kavindu Perera: "I reviewed the initial PR. Could you update the mobile navbar?"',
      createdDate: '4 hours ago',
      readStatus: true,
      targetLink: '/messages?peerId=client-001'
    },
    {
      id: 'NOTIF-S4',
      type: 'rating',
      title: 'New 5-Star Review ⭐',
      message: 'Client left a 5-star review: "Exceptional frontend code and swift turnaround time!"',
      createdDate: 'Yesterday',
      readStatus: true,
      targetLink: '/student/std-001'
    }
  ];

  const clientNotifications = [
    {
      id: 'NOTIF-C1',
      type: 'new_bid',
      title: 'New Student Reverse Bid! 🎓',
      message: 'Dulaksha Nipun (SEU/IS/22/ICT/047) submitted a $35 proposal for "React & Tailwind Landing Page".',
      createdDate: '5 mins ago',
      readStatus: false,
      targetLink: '/clientdashboard'
    },
    {
      id: 'NOTIF-C2',
      type: 'deliverable_submitted',
      title: 'Deliverable Ready for Review 🚀',
      message: 'Dulaksha submitted project live preview & GitHub repository for ORD-9477. Please inspect.',
      createdDate: '1 hour ago',
      readStatus: false,
      targetLink: '/clientdashboard'
    },
    {
      id: 'NOTIF-C3',
      type: 'new_message',
      title: 'New Message from Student',
      message: 'Dulaksha: "I pushed the deliverable link to the Student Dashboard for your review!"',
      createdDate: '3 hours ago',
      readStatus: true,
      targetLink: '/messages?peerId=std-001'
    }
  ];

  const [notifications, setNotifications] = useState(
    isClientRole ? clientNotifications : studentNotifications
  );

  useEffect(() => {
    setNotifications(isClientRole ? clientNotifications : studentNotifications);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.readStatus).length;

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, readStatus: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, readStatus: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'bid_accepted':
        return <Briefcase className="w-4 h-4 text-[#007a4d]" />;
      case 'new_bid':
        return <Briefcase className="w-4 h-4 text-blue-600" />;
      case 'deliverable_submitted':
        return <FileCheck2 className="w-4 h-4 text-amber-500" />;
      case 'payment_released':
        return <DollarSign className="w-4 h-4 text-[#007a4d]" />;
      case 'new_message':
        return <MessageSquare className="w-4 h-4 text-emerald-600" />;
      case 'rating':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-xl transition-colors ${
          isOpen
            ? 'text-[#007a4d] bg-[#eaf8f1]'
            : 'text-gray-600 hover:text-[#007a4d] hover:bg-gray-50'
        }`}
        title="Notifications"
        aria-label="View Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-[#007a4d] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 ring-2 ring-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl border border-gray-100 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 font-sans">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900">
                {isClientRole ? 'Client Notifications' : 'Student Notifications'}
              </h3>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold text-[#007a4d] bg-[#eaf8f1] px-2 py-0.5 rounded-full border border-emerald-100">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[11px] font-bold text-[#007a4d] hover:text-[#00633e] flex items-center gap-1 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-50 p-1.5 space-y-1">
            {notifications.length > 0 ? (
              notifications.map((item) => (
                <Link
                  key={item.id}
                  to={item.targetLink}
                  onClick={() => {
                    handleMarkAsRead(item.id);
                    setIsOpen(false);
                  }}
                  className={`p-3 sm:p-3.5 rounded-2xl transition-all flex items-start gap-3 text-left block ${
                    !item.readStatus
                      ? 'bg-[#eaf8f1]/50 hover:bg-[#eaf8f1]/80'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-2xs flex items-center justify-center shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="text-xs font-bold text-gray-900 truncate">
                        {item.title}
                      </h4>
                      {!item.readStatus && (
                        <span className="w-2 h-2 rounded-full bg-[#007a4d] shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1.5 font-medium">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{item.createdDate}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-gray-400">
                No notifications right now.
              </div>
            )}
          </div>

          <div className="p-2.5 bg-gray-50 border-t border-gray-100 text-center">
            <span className="text-[11px] text-gray-400 font-medium">
              UniGig Escrow & Activity Alerts
            </span>
          </div>
        </div>
      )}
    </div>
  );
}